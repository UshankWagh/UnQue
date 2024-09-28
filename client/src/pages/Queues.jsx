import React, { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client";
import '../styles/Queues.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Queues = () => {

    const socket = useMemo(
        () =>
            io("http://localhost:5000", {
                withCredentials: true,
            }),
        []
    );

    const [socketID, setSocketId] = useState("");
    const [joinedQs, setJoinedQs] = useState([]);
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));

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

        const getJoinedQs = async () => {
            const joinedQsRes = await axios.get(`http://localhost:5000/counters/get-joined-qs/all/${auth.id}`);
            setJoinedQs(joinedQsRes.data.joinedQs);
        }
        getJoinedQs();
    }, []);

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
        let canceledNo = 0;
        for (let i = 0; i < cancelledTickets.length; i++) {
            if (cancelledTickets[i] < ticket) {
                canceledNo += 1;
            }
        }
        const qPos = (ticket - firstTicket + 1) - canceledNo;
        return qPos;
    }

    const QueueBox = ({ shopName, counterNo, ticket, queueCount, shopownerId, qPosition }) => {
        return (
            <div className="queue-box">
                <div className="queue-val">{shopName}</div>
                <div className="queue-val">{counterNo}</div>
                <div className="queue-val">{ticket}</div>
                <div className="queue-val">{qPosition}</div>
                <div className="queue-val">{queueCount}</div>
                <div className="queue-val"><Link to={`/shop?shopid=${shopownerId}`} className='btn view-shop-btn'>View Shop</Link></div>
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
                    <div className="queue-head">Shop Name</div>
                    <div className="queue-head">Counter No.</div>
                    <div className="queue-head">Ticket</div>
                    <div className="queue-head">Your Position</div>
                    <div className="queue-head">Queue Count</div>
                    <div className="queue-head">Action</div>
                </div>
                {/* {joinedQs.map(({ shopName, counterNo, ticket, queueCount, shopownerId, _id, firstTicket, cancelledTickets }) => { */}
                {joinedQs.length ? joinedQs.map((joinedQ) => {
                    const { shopName, counterNo, queueCount, shopownerId, _id, firstTicket, cancelledTickets } = joinedQ.queue;
                    const { ticket } = joinedQ;
                    {/* console.log("jq", joinedQ.queue, shopName, counterNo, ticket, queueCount, shopownerId, _id, firstTicket, cancelledTickets); */ }
                    const qPosition = getQPosition(firstTicket, ticket, cancelledTickets);
                    socket.emit("join-room", _id);
                    {/* console.log("pp", qPosition, firstTicket, joinedQ.queue.lastTicket, cancelledTickets) */ }
                    return <QueueBox key={_id} {...{ shopName, counterNo, ticket, queueCount, shopownerId, qPosition }} />
                }) : "No Queues Joined"}
            </div>
        </div>
    )
}

export default Queues
