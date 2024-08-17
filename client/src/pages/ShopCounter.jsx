import React from 'react'
import '../styles/ShopCounter.css'

const Ticket = ({ ticket }) => {
    return (
        <div className="ticket">
            {ticket}
        </div>
    )
}

const ShopCounter = () => {
    return (
        <div className='shop-counter'>
            <div className="head">
                <h1>Counter <span>1</span></h1>
                <button className='btn'>Open</button>
            </div>
            <p className='queue-head'>Queue</p>
            <div className="shop-counter-container">
                <div className="queue">
                    <div className="tickets">
                        <Ticket ticket={"#ab123"} />
                        <Ticket ticket={"#ab123"} />
                        <Ticket ticket={"#ab123"} />
                        <Ticket ticket={"#ab123"} />
                        <Ticket ticket={"#ab123"} />
                        <Ticket ticket={"#ab123"} />
                        <Ticket ticket={"#ab123"} />
                    </div>
                    <p className="que-count">25</p>
                    <button className='btn danger remove-btn'>Remove</button>
                </div>
                {/* <div className="sp-counter">
                </div> */}
            </div>
        </div>
    )
}

export default ShopCounter
