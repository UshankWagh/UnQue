import React, { useEffect, useMemo, useState } from "react";
import '../styles/EmployeeDash.css';
import shop_img from '../assets/images/shop_img.png'
import Counter from '../components/Counter';
import ShopImage from '../components/ShopImage';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { io } from "socket.io-client";

const EmployeeDash = ({ auth }) => {

    const [shopId, setShopId] = useState("");
    const [shopOwnerName, setShopOwnerName] = useState("");
    const [shopAddress, setShopAddress] = useState("");
    const [shopName, setShopName] = useState("");
    const [shopImg, setShopImg] = useState("");
    const [shopCounter, setShopCounter] = useState({});
    const [ratings, setRatings] = useState(0);
    const [socketID, setSocketId] = useState("");

    const socket = useMemo(
        () =>
            io(`${import.meta.env.VITE_SERVER_URL}`, {
                withCredentials: true,
            }),
        []
    );

    const navigate = useNavigate()

    useEffect(() => {
        const loadData = async () => {
            const resp = await axios.get(`${import.meta.env.VITE_SERVER_URL}/shops/shop-dets/employee/${auth.id}`);

            if (resp.data.success) {
                const shop = resp.data.shop
                setShopName(shop.shopName)
                setShopImg(shop.shopImg)
                setRatings(shop.ratings)
                setShopId(resp.data.shopId)
                setShopOwnerName(resp.data.shopOwnerName)
                setShopAddress(shop.state + ", " + shop.city + ", " + shop.area + ".")
                setShopCounter(() => (shop.counters.find(counter => counter.counterNo == resp.data.counterNo)));
            }
        }

        loadData()

        console.log(shopCounter?.queue?._id);

        socket.emit("join-room", shopCounter?.queue?._id)

        socket.on("connect", () => {
            setSocketId(socket.id);
            console.log("connected", socket.id);
        });


        socket.on("counter-status-changed", ({ queueId, status }) => {
            console.log(`O / C ${status} ${queueId}`);

            setShopCounter(p => {
                if (p.queue._id == queueId) {
                    p.queue.isOpen = status
                }
                return p;
            })
        });

        socket.on("joined-queue", ({ queueId, queueCount, lastTicket }) => {
            console.log(queueCount, lastTicket);

            setShopCounter(p => {
                // if (p.queue._id == queueId) {
                p.queue.queueCount = queueCount
                p.queue.lastTicket = lastTicket
                // }
                return p;
            })
        });

        socket.on("cancelled-ticket", ({ queueId, queueCount, type, ticket }) => {
            console.log(queueId, queueCount, type, ticket);

            setShopCounter(p => {
                if (p.queue._id == queueId) {
                    p.queue.queueCount = queueCount
                }
                return { ...p };
            })

        });

        socket.on("added-or-deleted-counter", ({ type, counter }) => {

            if (counter.counterNo == shopCounter?.counterNo) {

                switch (type) {
                    case "add":
                        setShopCounter(counter);
                        break;

                    case "delete":
                        setShopCounter({});
                        break;

                    default:
                        break;
                }
            }
        })

        socket.on("wait-time-updated", ({ queueId, minWaitTime }) => {
            console.log(`q m ${queueId} ${minWaitTime}`);
            setShopCounter((prvCounter) => {
                if (prvCounter.queue._id == queueId) {
                    prvCounter.queue.minWaitTime = minWaitTime;
                }
                return { ...prvCounter };
            });
        });

    }, [])


    const handleRedirect = (no) => {
        navigate(`/employee/counter?shopId=${shopId}&shopName=${shopName}&counterNo=${no}`)
    }



    return (
        <div className='employee-dash'>
            <h1>Employee Dashboard</h1>

            {/* Image is static */}
            <ShopImage shopName={shopName} shop_img={shop_img} shopAddress={shopAddress} shopOwnerName={shopOwnerName} ratings={ratings} />
            <div className='sub-head'>Counters</div>
            <div className="counters">
                {/* {
                    shopCounters.map((counter, index) => {
                        socket.emit("join-room", counter.queue._id);
                        return <Counter no={counter.counterNo} queueCount={counter.queue.queueCount} isOpen={counter.queue.isOpen} btn={{ text: "View", type: "btn", isDisabled: false, onClickHandler: () => handleRedirect(counter.counterNo) }} key={index} />
                    })
                } */}

                <Counter no={shopCounter?.counterNo} queueCount={shopCounter?.queue?.queueCount} minWaitTime={shopCounter?.queue?.minWaitTime} isOpen={shopCounter?.queue?.isOpen} btn={{ text: "View", type: "btn", isDisabled: false, onClickHandler: () => handleRedirect(shopCounter?.counterNo) }} />
            </div>
        </div>
    )
}

export default EmployeeDash
