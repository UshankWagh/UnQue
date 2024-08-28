import React from 'react'
import { FaPeopleGroup } from "react-icons/fa6";
import '../styles/Counter.css'

const Counter = ({ no, queueCount, btn }) => {
    return (
        <div className="counter">
            <div className="dets">
                <div className="counter-no">No. {no}</div>
                <div className="q-count">
                    <FaPeopleGroup />
                    <p>Queue count :</p>
                    <span>{queueCount}</span>
                </div>

            </div>
            <button className={`btn ${btn.type}`} onClick={() => { btn.onClickHandler(no) }} >{btn.text}</button>
        </div>
    )
}

export default Counter
