import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import PopUp from '../components/PopUp'
import '../styles/Shop.css';
import shop_img1 from '../assets/images/shop_img.png'
import shop_img2 from '../assets/images/shop_img2.jpg'
import Counter from '../components/Counter'
import ShopImage from '../components/ShopImage'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';

const Shop = ({ auth }) => {

    const socket = useMemo(
        () =>
            io(`${import.meta.env.VITE_SERVER_URL}`, {
                withCredentials: true,
            }),
        []
    );
    // console.log(auth.id);

    const [socketID, setSocketId] = useState("");
    const [shop, setShop] = useState();
    const [popupDets, setPopupDets] = useState({
        title: "",
        desc: "",
        isOpen: false,
        counterNo: 0
    });
    const [alreadyJoinedQ, setAlreadyJoinedQ] = useState("");

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        socket.on("connect", () => {
            setSocketId(socket.id);
            console.log("connected", socket.id);
        });
        socket.on("joined-queue", ({ queueId, queueCount }) => {
            console.log("someone joined ", queueId, "qi qc", queueCount);
            updateQueueCount(queueId, queueCount);
        });
        socket.on("cancelled-ticket", ({ queueId, queueCount }) => {
            console.log("on canceled ticket", queueId, queueCount);
            updateQueueCount(queueId, queueCount);
        });
        socket.on("counter-status-changed", ({ queueId, status }) => {
            console.log(`O / C ${status} ${queueId}`);
            setShop((prvShop) => {
                prvShop.shop.counters.map((counter, ind) => {
                    // console.log("qids", counter.queue._id, queueId);
                    if (counter.queue?._id == queueId) {
                        // console.log("qcnts", counter.queue.queueCount, queueCount);
                        prvShop.shop.counters[ind].queue.isOpen = status
                        // counter.queue.queueCount = queueCount;
                    }
                    return;
                })
                // console.log("prvS", prvShop);
                return { ...prvShop };
            });
        });
        socket.on("wait-time-updated", ({ queueId, minWaitTime }) => {
            console.log(`q m ${queueId} ${minWaitTime}`);
            setShop((prvShop) => {
                prvShop.shop.counters.map((counter, ind) => {
                    if (counter.queue?._id == queueId) {
                        prvShop.shop.counters[ind].queue.minWaitTime = minWaitTime;
                    }
                    return;
                })
                return { ...prvShop };
            });
        });

        const getShop = async () => {

            const shopId = searchParams.get("shopid");
            const shopRes = await axios.get(`${import.meta.env.VITE_SERVER_URL}/shops/get-shop/${shopId}`);
            const joinedQsRes = await axios.get(`${import.meta.env.VITE_SERVER_URL}/counters/get-joined-qs/ids/${auth?.id}`);
            // console.log(shopId, shopRes);
            let joinedQs = joinedQsRes.data.joinedQs;
            let counters = shopRes.data.shop.shop.counters;
            setShop(shopRes.data.shop);
            for (let queue of joinedQs) {
                for (let counter of counters) {
                    if (queue.queue == counter.queue?._id) {
                        setAlreadyJoinedQ(queue.queue);
                        return
                    }
                }
            }
        }
        getShop();
    }, []);

    // console.log("auth", auth);

    const updateQueueCount = (queueId, queueCount) => {
        setShop((prvShop) => {
            prvShop.shop.counters.map((counter, ind) => {
                // console.log("qids", counter.queue._id, queueId);
                if (counter.queue?._id == queueId) {
                    // console.log("qcnts", counter.queue.queueCount, queueCount);
                    prvShop.shop.counters[ind].queue.queueCount = queueCount;
                }
                return;
            })
            // console.log("prvS", prvShop);
            return { ...prvShop };
        });
    }

    const handleJoinQueue = (confirmed) => {
        const counter = shop.shop.counters.filter(counter => counter.counterNo == popupDets.counterNo)[0];
        if (confirmed && popupDets.action == "Join") {
            joinQueue(counter);
            console.log("joined queue");
        }
        else if (confirmed && popupDets.action == "Cancel") {
            cancelTicket(counter);
            setAlreadyJoinedQ(0);
            console.log("canceled queue");
        }
        setPopupDets({
            title: "",
            desc: "",
            isOpen: false,
            counterNo: 0
        });
    }

    const joinQueue = async (counter) => {
        // console.log(counter.queue);

        const joinQRes = await axios.post(`${import.meta.env.VITE_SERVER_URL}/counters/join-queue`, {
            queueId: counter.queue._id,
            customerId: auth.id
        });
        console.log("jqr", joinQRes.data);

        if (joinQRes.data.success) {
            console.log("ai", auth.id);
            socket.emit("join-queue", { ...joinQRes.data.queue, customerId: auth.id, queueId: counter.queue._id });
            navigate("/customer/queues");
        }
        // console.log("jqres", joinQRes, counter.queue._id);
    }

    const cancelTicket = async (counter) => {
        // console.log(counter.queue);

        const cancelTRes = await axios.post(`${import.meta.env.VITE_SERVER_URL}/counters/cancel-ticket`, {
            queueId: counter.queue._id,
            customerId: auth.id
        });
        console.log("ctkt", cancelTRes.data);
        if (cancelTRes.data.success) {
            const { queueCount, canceledTicket, ticketType } = cancelTRes.data;
            updateQueueCount(counter.queue._id, queueCount);
            socket.emit("cancel-ticket", { queueId: counter.queue._id, queueCount: queueCount, type: ticketType, ticket: canceledTicket });
            console.log("canceled");
            // setJoinedQs(jqs => {
            //     return jqs.filter(q => q != counter.queue._id);
            // })
        }
        // console.log(joinQRes);
    }

    const handleCounterAction = (action, counterNo) => {
        if (action == "Join") {
            setPopupDets({
                isOpen: true,
                action,
                title: "Confirmation",
                desc: `Are you sure to join queue of Counter No. ${counterNo}`,
                counterNo
            });
        }
        else if (action == "Cancel") {
            setPopupDets({
                isOpen: true,
                action,
                title: "Confirmation",
                desc: `Are you sure to cancel your queue ticket of Counter No. ${counterNo}`,
                counterNo
            });
        }
    }

    console.log(shop);

    return (
        <div className="shop">
            {popupDets.isOpen > 0 && <PopUp title={popupDets.title} desc={popupDets.desc} confirmation={handleJoinQueue} />}
            <h1>Shop</h1>
            <ShopImage shopName={shop?.shop?.shopName} shopOwnerName={`${shop?.firstName} ${shop?.lastName}`} shopAddress={`${shop?.shop?.area}, ${shop?.shop?.city}, ${shop?.shop?.state}.`} shop_img={`${shop?.shop?.shopName == "Evergreen Grocery" ? shop_img1 : shop_img2}`} />
            <div className='sub-head'>Counters</div>
            <div className="txt">Select the shop counter you want to join!</div>
            <div className="counters">
                {shop && shop.shop.counters.map((counter) => {
                    let text = counter.queue?._id == alreadyJoinedQ ? "Cancel" : "Join";
                    console.log(alreadyJoinedQ, text, counter.queue?.isOpen)
                    let isDisabled = (alreadyJoinedQ && text == "Join") || !counter.queue?.isOpen ? true : false;
                    let type = text == "Join" ? "btn" : "danger";
                    let totalWaitTime = counter.queue?.minWaitTime * counter.queue?.queueCount;
                    socket.emit("join-room", counter.queue?._id);
                    return <Counter key={counter.counterNo} no={counter.counterNo} queueCount={counter.queue?.queueCount} minWaitTime={totalWaitTime} isOpen={counter.queue?.isOpen} btn={{ text, isDisabled, type, onClickHandler: () => handleCounterAction(text, counter.counterNo) }} />
                })}
            </div>
        </div>
    )
}

export default Shop
