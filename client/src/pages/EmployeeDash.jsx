import React, { useEffect, useMemo, useState } from "react";
import '../styles/EmployeeDash.css';
import shop_img from '../assets/images/shop_img.png'
import Counter from '../components/Counter';
import ShopImage from '../components/ShopImage';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { io } from "socket.io-client";

const EmployeeDash = () => {

    const [shopId, setShopId] = useState("");
    const [shopOwnerName, setShopOwnerName] = useState("");
    const [shopAddress, setShopAddress] = useState("");
    const [shopName, setShopName] = useState("");
    const [shopImg, setShopImg] = useState("");
    const [shopCounters, setShopCounters] = useState([]);
    const [socketID, setSocketId] = useState("");
    const [auth, setAuth] = useState(localStorage.getItem("auth") != "undefined" ? JSON.parse(localStorage.getItem("auth")) : "");

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
                setShopCounters(shop.counters)
                setShopId(resp.data.shopId)
                setShopOwnerName(resp.data.shopOwnerName)
                setShopAddress(shop.state + ", " + shop.city + ", " + shop.area + ".")
            }
        }

        loadData()

        socket.on("connect", () => {
            setSocketId(socket.id);
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

        socket.on("added-or-deleted-counter", ({ type, counter }) => {

            switch (type) {
                case "add":
                    setShopCounters(p => {
                        p.push(counter)
                        return [...p]
                    })
                    break;

                case "delete":
                    setShopCounters(p => {
                        p = p.filter(c => c.counterNo != counter.counterNo)
                        return [...p]
                    })
                    break;

                default:
                    break;
            }
        })

    }, [])


    const handleRedirect = (no) => {
        navigate(`/employee/counter?shopId=${shopId}&counterNo=${no}`)
    }



    return (
        <div className='employee-dash'>
            <h1>Employee Dashboard</h1>

            {/* Image is static */}
            <ShopImage shopName={shopName} shop_img={shop_img} shopAddress={shopAddress} shopOwnerName={shopOwnerName} />
            <div className='sub-head'>Counters</div>
            <div className="counters">
                {
                    shopCounters.map((counter, index) => {
                        socket.emit("join-room", counter.queue._id);
                        return <Counter no={counter.counterNo} queueCount={counter.queue.queueCount} isOpen={counter.queue.isOpen} btn={{ text: "View", type: "btn", isDisabled: false, onClickHandler: () => handleRedirect(counter.counterNo) }} key={index} />
                    })
                }
            </div>
        </div>
    )
}

export default EmployeeDash
