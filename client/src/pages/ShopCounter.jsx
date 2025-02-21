import React, { useEffect, useMemo, useState } from "react";
import '../styles/ShopCounter.css'
import { useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import PopUp from '../components/PopUp.jsx';


// shopname     back button

// working customer id

const Ticket = ({ ticket }) => {
    return (
        <div className="ticket">
            {ticket}
        </div>
    )
}

const ShopCounter = ({ auth }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const shopId = searchParams.get("shopId")
    const counterNo = searchParams.get("counterNo")
    const shopName = searchParams.get("shopName")


    const [queue, setQueue] = useState([]);
    const [queueId, setQueueId] = useState("");
    const [queueCount, setQueueCount] = useState(0);
    const [isOpen, setIsOpen] = useState(true);
    const [popupDets, setPopupDets] = useState({
        title: "",
        desc: "",
        isOpen: false,
        counterNo: 0
    });

    const [socketID, setSocketId] = useState("");

    const socket = useMemo(
        () =>
            io(`${import.meta.env.VITE_SERVER_URL}`, {
                withCredentials: true,
            }),
        []
    );

    const loadData = async () => {
        const resp = await axios.get(`${import.meta.env.VITE_SERVER_URL}/counters/get-queue/${shopId}/${counterNo}`);
        if (resp.data.success) {
            const { queue } = resp.data;
            console.log(queue);
            setIsOpen(queue.isOpen);
            setQueueCount(queue.queueCount)
            setQueueId(queue._id)

            socket.emit("join-room", queue._id);

            setQueue(() => createQueue(queue.firstTicket, queue.lastTicket, queue.cancelledTickets));
        }
        else {
            alert(resp.data.message)
        }
    }

    useEffect(() => {
        loadData()

        socket.on("connect", () => {
            setSocketId(socket.id);
            console.log("connected", socket.id);
        });

        socket.on("joined-queue", ({ queueId, queueCount, lastTicket, customerId }) => {
            console.log(customerId, queueCount, lastTicket);
            setQueueCount(queueCount)
            setQueue(p => {
                p.unshift({ customerId, ticket: lastTicket })
                localStorage.setItem("queue", JSON.stringify(p))
                return [...p]
            })
        });

        socket.on("cancelled-ticket", ({ _, queueCount, type, ticket }) => {
            console.log(queueCount, type, ticket);

            setQueueCount(queueCount)

            // check review
            setQueue(p => {
                p = p.filter(ticketObj => ticketObj.ticket != ticket)
                localStorage.setItem("queue", JSON.stringify(p))
                notifyCustomers(p);
                return [...p]
            });



            // Test  --------**
            // But Not Required

            // switch (type) {
            //     case "f-ticket":
            //         setFirstTicket(queue.slice(-2)[0])
            //         break;

            //     case "m-ticket":
            //         setCancelledTickets(p => {
            //             p.push(ticket)
            //             return { ...p }
            //         })
            //         break;

            //     case "l-ticket":
            //         setLastTicket(queue[1])
            //         break;

            //     default:
            //         break;
            // }

        });

    }, [])



    const createQueue = (firstTicket, lastTicket, cancelledTickets) => {
        let que = []
        let storedQueue = localStorage.getItem("queue");
        if (storedQueue?.length) return JSON.parse(storedQueue)

        if (firstTicket > 100) {
            for (let ticket = lastTicket; ticket >= firstTicket; ticket--) {
                if (!(cancelledTickets.includes(ticket))) {

                    que.push({ customerId: "", ticket })
                }
            }
            localStorage.setItem("queue", JSON.stringify(que))
        }
        return que
    }

    const handleOpenClose = async (confirm) => {
        if (confirm) {
            setIsOpen(!isOpen)

            const resp = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/counters/queue/open-close-queue`, { queueId, isOpen: !isOpen })

            if (resp.data.success) {
                socket.emit("change-counter-status", { queueId, status: !isOpen })
            }
            else {
                alert(resp.data.message)
                setIsOpen(isOpen)
            }
        }

        setPopupDets({
            title: "",
            desc: "",
            isOpen: false,
            counterNo: 0
        });

    }

    const handleRemoveTicket = async () => {
        console.log("r");

        let updatedQueue = queue
        let ticket
        ticket = updatedQueue.pop().ticket

        localStorage.setItem("queue", JSON.stringify(updatedQueue))

        console.log(updatedQueue, ticket);

        setQueue(updatedQueue);
        setQueueCount(p => p - 1)

        socket.emit("cancel-ticket", { queueId, queueCount: queueCount - 1, type: ticketType, ticket: ticket });

        // queueCount                        0                 > 0
        let reqBody = {
            queueId,
            ticket: !(queueCount - 1) ? queue[0].ticket - 1 : queue.slice(-2)[0].ticket,
            isLastTicket: !(queueCount - 1)
        }

        console.log(reqBody);


        // const resp1 = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/counters/queue/remove-ticket`, reqBody)

        // if (resp1.data.success) {
        //     console.log("qt", queue, queue.slice(-1)[0], ticket);

        //     socket.emit("cancel-ticket", { queueId, queueCount: queueCount - 1, type: "f-ticket", ticket })

        // }
        // else {
        //     alert(resp1.data.message)
        //     setQueue(queue)
        //     setQueueCount(queueCount)
        // }

        notifyCustomers(updatedQueue);

    }

    const notifyCustomers = async (updatedQueue) => {

        let customers = [];

        if (updatedQueue?.length >= 2) {

            let customer = updatedQueue.slice(-2)[0]
            customers.push({ id: customer.customerId, shopName, counterNo, ticket: customer.ticket })

            if (updatedQueue?.length >= 3) {

                customer = updatedQueue.slice(-3)[0]
                customers.push({ id: customer.customerId, shopName, counterNo, ticket: customer.ticket })
            }
        }

        console.log(customers);

        const resp2 = await axios.post(`${import.meta.env.VITE_SERVER_URL}/counters/notify-customer`, { customers })

    }

    const confirmation = (action, newStatus) => {

        if (action == "open-close-counter") {
            setPopupDets({
                isOpen: true,
                action,
                title: `${newStatus} Counter?`,
                desc: `Are you sure you want to ${newStatus} the Counter`
            });
        }
    }

    console.log(queue);


    return (
        <div className='shop-counter'>
            {popupDets.isOpen > 0 && <PopUp title={popupDets.title} desc={popupDets.desc} confirmation={handleOpenClose} />}
            <div className="head">
                <div className="head-l">
                    {/* <span className="back-btn btn">{"<-"}</span> */}
                    <h1>Counter <span>{counterNo}</span></h1>
                </div>
                <button className='btn' onClick={() => { confirmation("open-close-counter", isOpen ? "Close" : "Open") }}>{isOpen ? "Close" : "Open"}</button>
            </div>
            <p className='queue-head'>Queue</p>
            <div className="shop-counter-container">
                <div className="queue">
                    <div className="tickets">
                        {/* <Ticket ticket={102} key={"index"} />
                        <Ticket ticket={102} key={"index"} />
                        <Ticket ticket={102} key={"index"} />
                        <Ticket ticket={102} key={"index"} />
                        <Ticket ticket={102} key={"index"} />
                        <Ticket ticket={102} key={"index"} /> */}
                        {
                            queue.map((ticketObj, index) => <Ticket ticket={ticketObj.ticket} key={index} />)
                        }
                    </div>
                    <p className="que-count">{queueCount}</p>
                    <button disabled={!queueCount} className={`btn danger remove-btn ${!queueCount && "btn-disabled"}`} onClick={() => handleRemoveTicket()}>Remove</button>
                </div>
            </div>
        </div>
    )
}

export default ShopCounter
