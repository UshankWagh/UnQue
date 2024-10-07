import React, { useEffect, useMemo, useState } from "react";
import '../styles/ShopCounter.css'
import { useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios"

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


    // const [firstTicket, setFirstTicket] = useState(null);
    // const [lastTicket, setLastTicket] = useState(null);
    // const [cancelledTickets, setCancelledTickets] = useState([]);
    const [queue, setQueue] = useState([]);
    const [queueId, setQueueId] = useState("");
    const [queueCount, setQueueCount] = useState(0);
    const [isOpen, setIsOpen] = useState(true);

    const [socketID, setSocketId] = useState("");

    const socket = useMemo(
        () =>
            io(`${import.meta.env.VITE_SERVER_URL}`, {
                withCredentials: true,
            }),
        []
    );

    useEffect(() => {
        loadData()

        socket.on("connect", () => {
            setSocketId(socket.id);
            console.log("connected", socket.id);
        });

        socket.on("joined-queue", ({ queueId, queueCount, lastTicket }) => {
            console.log(queueCount, lastTicket);
            setQueueCount(queueCount)
            setQueue(p => {
                p.unshift(lastTicket)
                return [...p]
            })
        });

        socket.on("cancelled-ticket", ({ _, queueCount, type, ticket }) => {
            console.log(queueCount, type, ticket);

            setQueueCount(queueCount)

            setQueue(p => {
                p = p.filter(tk => tk != ticket)
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


    const loadData = async () => {
        const resp = await axios.get(`${import.meta.env.VITE_SERVER_URL}/counters/get-queue/${shopId}/${counterNo}`);
        if (resp.data.success) {
            const { queue } = resp.data;
            console.log(queue);
            setIsOpen(queue.isOpen);
            setQueueCount(queue.queueCount)
            // setFirstTicket(queue.firstTicket)
            // setLastTicket(queue.lastTicket)
            // setCancelledTickets(queue.cancelledTickets)
            setQueueId(queue._id)

            socket.emit("join-room", queue._id);

            setQueue(() => createQueue(queue.firstTicket, queue.lastTicket, queue.cancelledTickets));
        }
        else {
            alert(resp.data.message)
        }
    }

    const createQueue = (firstTicket, lastTicket, cancelledTickets) => {
        let que = []
        if (firstTicket > 100) {
            for (let ticket = lastTicket; ticket >= firstTicket; ticket--) if (!(cancelledTickets.includes(ticket))) que.push(ticket)
        }
        return que
    }

    const handleOpenClose = async () => {
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

    const handleRemoveTicket = async () => {
        console.log("r");

        let ticket

        setQueue(p => {
            ticket = p.pop()
            console.log(p);
            return [...p]
        });
        setQueueCount(p => p - 1)

        // queueCount                        0                 > 0
        let reqBody = {
            queueId,
            ticket: !(queueCount - 1) ? queue[0] - 1 : queue[queue.length - 2],
            isLastTicket: !(queueCount - 1)
        }
        // console.log("tk", queueId, queue.slice(-1)[0]);
        const resp = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/counters/queue/remove-ticket`, reqBody)

        if (resp.data.success) {
            console.log("qt", queue, queue.slice(-1)[0], ticket);

            socket.emit("cancel-ticket", { queueId, queueCount: queueCount - 1, type: "f-ticket", ticket })

        }
        else {
            alert(resp.data.message)
            setQueue(queue)
            setQueueCount(queueCount)
        }
    }

    console.log(queue);


    return (
        <div className='shop-counter'>

            <div className="head">
                <h1>Counter <span>{counterNo}</span></h1>
                <button className='btn' onClick={() => { handleOpenClose() }}>{isOpen ? "Close" : "Open"}</button>
            </div>
            <p className='queue-head'>Queue</p>
            <div className="shop-counter-container">
                <div className="queue">
                    <div className="tickets">
                        {
                            queue.map((ticket, index) => <Ticket ticket={ticket} key={index} />)
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
