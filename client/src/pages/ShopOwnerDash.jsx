import React, { act, useEffect, useMemo, useState } from 'react'
import shop_img from '../assets/images/shop_img.png'
import Counter from '../components/Counter';
import ShopImage from '../components/ShopImage';
import PopUp from '../components/PopUp.jsx'
import '../styles/ShopOwnerDash.css'
import axios from 'axios'
import { io } from 'socket.io-client'

const ShopOwnerDash = () => {

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

    const shopOwnerId = "66b911492cc0c1620b918462"

    const socket = useMemo(
        () =>
            io(`${import.meta.env.VITE_SERVER_URL}`, {
                withCredentials: true,
            }),
        []
    );

    useEffect(() => {
        const loadData = async () => {
            const resp = await axios.get(`${import.meta.env.VITE_SERVER_URL}/shops/shop-dets/${shopOwnerId}`);

            if (resp.data.success) {
                const shop = resp.data.shop
                setShopName(shop.shopName)
                setShopImg(shop.shopImg)
                setShopCounters(shop.counters)
                setShopEmployees(shop.employees)
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
        let counterNo = shopCounters.slice(-1)[0].counterNo + 1
        console.log(counterNo);

        const resp = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/counters/add-counter/${shopName}/${shopOwnerId}/${counterNo}`);
        if (resp.data.success) {
            setShopCounters(p => {
                p.push({
                    counterNo,
                    queue: resp.data.queue
                })
                return [...p]
            })
            socket.emit("join-room", resp.data.queue._id);
            alert(resp.data.message)
        }
        else {
            alert(resp.data.error)
        }
    }

    const deleteCounter = async (counterNo) => {
        const resp = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/counters/delete-counter/${shopOwnerId}/${counterNo}`);
        if (resp.data.success) {
            setShopCounters(p => {
                p = p.filter(counter => counter.counterNo != counterNo)
                return [...p]
            })
            alert(resp.data.message)
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

    // console.log(shopCounters);

    return (
        <div className='shop-owner-dash'>
            {popupDets.isOpen > 0 && <PopUp title={popupDets.title} desc={popupDets.desc} confirmation={handleConfirmation} />}
            <h1>Shop Owner Dashboard</h1>
            <ShopImage shopName={shopName} shop_img={shop_img} />
            <div className="counters-sec">
                <div className='sub-head'>Counters</div>
                <div className="add-btn">
                    <button className='btn' onClick={() => confirmation("add")} >Add Counter</button>
                </div>
                <div className="counters">
                    {
                        shopCounters?.map((counter, index) => {
                            socket.emit("join-room", counter.queue._id);
                            return <Counter no={counter.counterNo} queueCount={counter.queue.queueCount} isOpen={counter.queue.isOpen} btn={{ text: "Delete", type: "danger", isDisabled: counter.queue.isOpen, onClickHandler: () => { return counter.queue.queueCount ? alert("You cannot Delete, the Queue is'nt Empty") : confirmation("delete", counter.counterNo) } }} key={index} />
                        })
                    }
                </div>
            </div>

            <div className="employees-sec">
                <div className='sub-head'>Employees</div>
            </div>


        </div>
    )
}

export default ShopOwnerDash
