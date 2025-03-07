import React, { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client";
import '../styles/Queues.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaShop } from "react-icons/fa6";
import { MdCountertops } from "react-icons/md";
import { IoTicket } from "react-icons/io5";
import { MdPersonPin } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiShapesFill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import Loading from '../components/Loading';

const Queues = ({ auth }) => {

    const socket = useMemo(
        () =>
            io(`${import.meta.env.VITE_SERVER_URL}`, {
                withCredentials: true,
            }),
        []
    );

    const [socketID, setSocketId] = useState("");
    const [joinedQs, setJoinedQs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        socket.on("connect", () => {
            setSocketId(socket.id);
            console.log("connected", socket.id);
        });
        socket.on("joined-queue", ({ queueId, queueCount }) => {
            console.log("someone joined ", queueId, "qi qc", queueCount);
            updateQueueCount(queueId, queueCount);
        });
        // socket.on("cancelled-ticket", ({ queueId, queueCount }) => {
        //     console.log("on canceled ticket", queueId, queueCount);
        //     updateQueueCount(queueId, queueCount);
        // });
        socket.on("cancelled-ticket", ({ queueId, queueCount, type, ticket }) => {
            console.log(queueId, queueCount, type, ticket);
            setJoinedQs(prvJQs => {
                return handleCancelTicket(prvJQs, queueId, queueCount, type, ticket);
            })
        });
        socket.on("wait-time-updated", ({ queueId, minWaitTime }) => {
            console.log(`q m ${queueId} ${minWaitTime}`);
            setJoinedQs((prvJQs) => {
                prvJQs.map((jQ, ind) => {
                    if (jQ.queue._id == queueId) {
                        prvJQs[ind].queue.minWaitTime = minWaitTime;
                    }
                });
                return [...prvJQs];
            })
        });

        const getJoinedQs = async () => {
            setIsLoading(true);
            const joinedQsRes = await axios.get(`${import.meta.env.VITE_SERVER_URL}/counters/get-joined-qs/all/${auth.id}`);
            setJoinedQs(joinedQsRes.data.joinedQs);
            setIsLoading(false);
        }
        getJoinedQs();
    }, []);

    const handleCancelTicket = (joinedQs, queueId, queueCount, type, ticket) => {
        joinedQs = joinedQs.filter(jQ => {
            console.log("q idid", joinedQs, jQ.queue._id, queueId);

            if (jQ.queue._id == queueId) {
                console.log("jQ", jQ, queueCount, type, ticket);

                if (jQ.ticket == ticket) {
                    // joinedQs.splice(ind, 1);
                    console.log("jqtk tk", jQ.ticket, ticket);
                    cancelTicket(queueId);
                }
                else {
                    switch (type) {
                        case "f-ticket":
                            jQ.queue.firstTicket = ticket + 1
                            break;
                        case "m-ticket":
                            jQ.queue.cancelledTickets.push(ticket);
                            break;
                        case "l-ticket":
                            jQ.queue.lastTicket = ticket - 1
                            break;
                        default:
                            break;
                    }
                    console.log("aft upd", jQ);
                    jQ.queue.queueCount = queueCount
                    return jQ;
                }
            }
            else {
                return jQ;
            }
        });
        console.log("jqs", joinedQs);

        return joinedQs;
    }

    const cancelTicket = async (queueId) => {
        const cancelTRes = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/counters/customer/remove-ticket/`, {
            queueId,
            customerId: auth.id
        });
        console.log("ctkt", cancelTRes.data);

        setJoinedQs(prvJQs => {
            prvJQs.map((jQ, ind) => {
                if (jQ.queue._id == queueId) {
                    prvJQs[ind].queue.cancelledTickets.unshift(cancelTRes.cancelledTicket);
                }
            });
            return [...prvJQs];
        })
    }

    const updateQueueCount = (queueId, queueCount) => {
        // update jqs[i].queue.queueCount of jqs[i].queue._id with queueCount
        setJoinedQs((prvJQs) => {
            prvJQs.map((jQ, ind) => {
                if (jQ.queue._id == queueId) {
                    prvJQs[ind].queue.queueCount = queueCount
                }
            });
            return [...prvJQs];
        })
    }

    const getQPosition = (firstTicket, ticket, cancelledTickets) => {
        console.log("ftc", firstTicket, ticket, cancelledTickets);

        let canceledNo = 0;
        for (let i = 0; i < cancelledTickets.length; i++) {
            if (cancelledTickets[i] < ticket && cancelledTickets[i] > firstTicket) {
                canceledNo += 1;
            }
        }
        console.log("tfc", ticket, firstTicket, canceledNo);

        const qPos = (ticket - firstTicket + 1) - canceledNo;
        return qPos;
    }

    const QueueBox = ({ shopName, counterNo, ticket, minWaitTime, queueCount, shopownerId, qPosition }) => {
        return (
            <div className="queue-box">
                <div className="queue-val que-val-shopname">{shopName}</div>
                <div className="queue-val">0{counterNo}</div>
                <div className="queue-val">#{ticket}</div>
                <div className="queue-val">{minWaitTime ? ((qPosition - 1) * minWaitTime) + "mins" : "-"} </div>
                <div className="queue-val">@ {qPosition}</div>
                <div className="queue-val">{queueCount} Customer(s)</div>
                <div className="queue-val"><Link to={`/customer/shop?shopid=${shopownerId}`} className='btn view-shop-btn'>View Shop <FaArrowRight /></Link></div>
            </div>
        )
    }
    console.log("jqs", joinedQs);

    return (
        <div className='queues'>
            <h1>Queues</h1>
            <div className="queues-list">
                <div className="sub-head queues-head">Currently joined Queues </div>
                <div className="queue-th">
                    <div className="queue-head que-head-shopname"><FaShop /> Shop Name</div>
                    <div className="queue-head"><MdCountertops /> Counter No.</div>
                    <div className="queue-head"><IoTicket /> Your Ticket</div>
                    <div className="queue-head"><IoIosTime /> Your Turn in</div>
                    <div className="queue-head"><MdPersonPin /> Your Position</div>
                    <div className="queue-head"><FaPeopleGroup /> Customer(s)</div>
                    <div className="queue-head"><RiShapesFill /> Action</div>
                </div>
                {/* {joinedQs.map(({ shopName, counterNo, ticket, queueCount, shopownerId, _id, firstTicket, cancelledTickets }) => { */}
                {isLoading ? <Loading /> :
                    <div className="">
                        {joinedQs.length ? joinedQs.map((joinedQ) => {
                            const { shopName, counterNo, queueCount, minWaitTime, shopownerId, _id, firstTicket, cancelledTickets } = joinedQ.queue;
                            const { ticket } = joinedQ;
                            {/* console.log("jq", joinedQ.queue, shopName, counterNo, ticket, queueCount, shopownerId, _id, firstTicket, cancelledTickets); */ }
                            const qPosition = getQPosition(firstTicket, ticket, cancelledTickets);
                            socket.emit("join-room", _id);
                            {/* console.log("pp", qPosition, firstTicket, joinedQ.queue.lastTicket, cancelledTickets) */ }
                            return <QueueBox key={_id} {...{ shopName, counterNo, ticket, queueCount, minWaitTime, shopownerId, qPosition }} />
                        }) : "No Queues Joined"}
                    </div>}
            </div>
        </div>
    )
}

export default Queues
