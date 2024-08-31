import React, { useState } from 'react'
import '../styles/Queues.css'
import { Link } from 'react-router-dom';

const Queues = () => {
    // {
    //     "_id": {
    //       "$oid": "66b9157e976f6aa9f7766497"
    //     },
    //     "shopownerId": {
    //       "$oid": "66b911492cc0c1620b918462"
    //     },
    //     "shopName": "Evergreen Grocery",
    //     "counterNo": 1,
    //     "isOpen": true,
    //     "queueCount": 5,
    //     "firstTicket": "A101",
    //     "lastTicket": "A105",
    //     "cancelledTickets": [
    //       "A102",
    //       "A104"
    //     ]
    //   }

    const [queues, setQueues] = useState([
        {
            "_id": "66b9157e976f6aa9f7766497",
            "shopownerId": "66b911492cc0c1620b918462",
            "shopName": "Evergreen Grocery",
            "counterNo": 1,
            "isOpen": true,
            "queueCount": 7,
            "firstTicket": 101,
            "lastTicket": 109,
            "cancelledTickets": [
                102,
                104
            ],
            "ticket": 106
        },
        {
            "_id": "66b9157e976f6aa9f776649",
            "shopownerId": "66b911492cc0c1620b918462",
            "shopName": "Evergreen Grocery",
            "counterNo": 1,
            "isOpen": true,
            "queueCount": 5,
            "firstTicket": 101,
            "lastTicket": 105,
            "cancelledTickets": [
                102,
                104
            ],
            "ticket": "103"
        },
    ])

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
                {queues.map(({ shopName, counterNo, ticket, queueCount, shopownerId, _id, firstTicket, cancelledTickets }) => {
                    const qPosition = (ticket - firstTicket + 1) - cancelledTickets.length;
                    return <QueueBox key={_id} {...{ shopName, counterNo, ticket, queueCount, shopownerId, qPosition }} />
                })}
            </div>
        </div>
    )
}

export default Queues
