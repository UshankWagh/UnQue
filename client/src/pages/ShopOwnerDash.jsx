import React, { act, useEffect, useMemo, useState } from 'react'
import shop_img from '../assets/images/shop_img.png'
import Counter from '../components/Counter';
import ShopImage from '../components/ShopImage';
import PopUp from '../components/PopUp.jsx'
import '../styles/ShopOwnerDash.css'
import axios from 'axios'
import { io } from 'socket.io-client'
import { Link } from 'react-router-dom';


const TableRow = ({ avatar, firstName, lastName, email }) => {
    return (
        <div className="queue-box">
            <div className="queue-val">{avatar}</div>
            <div className="queue-val">{firstName}</div>
            <div className="queue-val">{lastName}</div>
            <div className="queue-val">{email}</div>
            <div className="queue-val"><Link to={`/customer/shop`} className='btn view-shop-btn'>View Shop</Link></div>
        </div>
    )
}

const ShopOwnerDash = ({ auth }) => {

    const [shopOwnerName, setShopOwnerName] = useState("");
    const [shopAddress, setShopAddress] = useState("");
    const [shopName, setShopName] = useState("");
    const [shopImg, setShopImg] = useState("");
    const [shopCounters, setShopCounters] = useState([]);
    const [shopEmployees, setShopEmployees] = useState([]);
    const [popupDets, setPopupDets] = useState({
        title: "",
        desc: "",
        isOpen: false,
        counterNo: 0
    });

    const socket = useMemo(
        () =>
            io(`${import.meta.env.VITE_SERVER_URL}`, {
                withCredentials: true,
            }),
        []
    );

    useEffect(() => {
        console.log(auth);

        const loadData = async () => {
            const resp = await axios.get(`${import.meta.env.VITE_SERVER_URL}/shops/shop-dets/shopowner/${auth.id}`);

            if (resp.data.success) {
                const shop = resp.data.shop
                console.log(shop.employees);

                setShopName(shop.shopName)
                setShopImg(shop.shopImg)
                setShopCounters(shop.counters)
                setShopEmployees(shop.employees)
                setShopOwnerName(resp.data.shopOwnerName)
                setShopAddress(shop.state + ", " + shop.city + ", " + shop.area + ".")
            }
        }

        socket.on('connect', () => {
            console.log("connected", socket.id);
        });

        socket.on("counter-status-changed", ({ queueId, status }) => {
            console.log(`O / C ${status} ${queueId}`);

            setShopCounters(p => {
                for (let i = 0; i < p.length; i++) {
                    if (p[i].queue._id == queueId) {
                        p[i].queue.isOpen = status
                    }
                }
                return [...p]
            })
        });

        socket.on("joined-queue", ({ queueId, queueCount, lastTicket }) => {
            console.log(queueCount, lastTicket);

            setShopCounters(p => {
                for (let i = 0; i < p.length; i++) {
                    if (p[i].queue._id == queueId) {
                        p[i].queue.queueCount = queueCount
                        p[i].queue.lastTicket = lastTicket
                    }
                }
                return [...p]
            })
        });

        socket.on("cancelled-ticket", ({ queueId, queueCount, type, ticket }) => {
            console.log(queueId, queueCount, type, ticket);

            setShopCounters(p => {
                for (let i = 0; i < p.length; i++) {
                    if (p[i].queue._id == queueId) {
                        p[i].queue.queueCount = queueCount
                    }
                }
                return [...p]
            })

        });

        loadData()
    }, [])

    const addCounter = async () => {
        let counter = shopCounters.slice(-1)[0]
        let counterNo = counter.counterNo + 1

        const resp = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/counters/add-counter/${shopName}/${auth.id}/${counterNo}`);

        if (resp.data.success) {

            setShopCounters(p => {
                p.push({
                    counterNo,
                    queue: resp.data.queue
                })
                return [...p]
            });

            socket.emit("join-room", resp.data.queue._id);
            socket.emit("add-or-delete-counter", { queueId: counter.queue._id, type: "add", counter: { counterNo, queue: resp.data.queue } })
        }
        else {
            alert(resp.data.error)
        }
    }

    const deleteCounter = async (counterNo) => {
        let delCounter = shopCounters.find((counter) => counter.counterNo == counterNo)

        const resp = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/counters/delete-counter/${auth.id}/${counterNo}`);

        if (resp.data.success) {
            setShopCounters(p => {
                p = p.filter(counter => counter.counterNo != counterNo)
                return [...p]
            })
            socket.emit("add-or-delete-counter", { queueId: delCounter.queue._id, type: "delete", counter: { counterNo: delCounter.counterNo } })
        }
        else {
            alert(resp.data.error)
        }
    }

    const confirmation = (action, counterNo) => {

        if (action == "delete") {
            setPopupDets({
                isOpen: true,
                action,
                title: "Delete Counter?",
                desc: `Are you sure you want to Delete Counter No. ${counterNo}`,
                counterNo
            });
        }
        else if (action == "add") {
            setPopupDets({
                isOpen: true,
                action,
                title: "Add Counter?",
                desc: "Are you sure you want to Add Counter",
            });
        }
    }

    const handleConfirmation = (confirm) => {
        if (confirm) {
            switch (popupDets.action) {
                case "add":
                    addCounter()
                    break;

                case "delete":
                    deleteCounter(popupDets.counterNo)
                    break;

                default:
                    break;
            }
        }

        setPopupDets({
            title: "",
            desc: "",
            isOpen: false,
            counterNo: 0
        });
    }

    console.log(shopOwnerName, shopAddress);

    return (
        <div className='shop-owner-dash'>
            {popupDets.isOpen > 0 && <PopUp title={popupDets.title} desc={popupDets.desc} confirmation={handleConfirmation} />}
            <h1>Shop Owner Dashboard</h1>
            <ShopImage shop_img={shop_img} shopName={shopName} shopAddress={shopAddress} shopOwnerName={shopOwnerName} />
            <div className="counters-sec">
                <div className='sub-head'>Counters</div>
                <div className="add-btn">
                    <button className='btn' onClick={() => confirmation("add")} >Add Counter</button>
                </div>
                <div className="counters">
                    {
                        shopCounters?.map((counter, index) => {
                            socket.emit("join-room", counter.queue._id);
                            return <Counter no={counter.counterNo} queueCount={counter.queue.queueCount} minWaitTime={counter.queue.minWaitTime} isOpen={counter.queue.isOpen} btn={{ text: "Delete", type: "danger", isDisabled: counter.queue.isOpen, onClickHandler: () => { return counter.queue.queueCount ? alert("You cannot Delete, the Queue is'nt Empty") : confirmation("delete", counter.counterNo) } }} key={index} />
                        })
                    }
                </div>
            </div>

            {/* <div className="employees-sec">
                <div className='sub-head'>Employees</div>
                <div className='employees'>
                    <div className="queues-list">
                        <div className="sub-head queues-head">Currently joined Queues </div>
                        <div className="queue-th">
                            <div className="queue-head">Avatar</div>
                            <div className="queue-head">First Name</div>
                            <div className="queue-head">Last Name</div>
                            <div className="queue-head">Email</div>
                            <div className="queue-head">Action</div>
                        </div>
                        {shopEmployees.length ? shopEmployees.map((employee) => {
                            const { _id, avatar, firstName, lastName, email } = employee;
                            console.log(_id)
                            return <TableRow key={_id} {...{ avatar, firstName, lastName, email }} />
                        }) : "No Employees Found"}
                    </div>
                </div>
            </div> */}


        </div>
    )
}

export default ShopOwnerDash
