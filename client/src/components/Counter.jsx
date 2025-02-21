import React from 'react'
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import '../styles/Counter.css'

/*
open close
disable
text
btn danger

isDisabled
text
type
*/

const Counter = ({ no, queueCount, minWaitTime, isOpen, btn }) => {
    return (
        <div className="counter">
            <div className="dets">
                <div className="counter-head">
                    <div className="counter-no">Counter No.: 0{no}</div>
                    <div className={`open-close ${isOpen ? "open" : "closed"}`}>{isOpen ? "Open" : "Closed"}</div>
                </div>
                <div className="q-count">
                    <FaPeopleGroup />
                    <p>Customer(s) :</p>
                    <span>{queueCount}</span>
                </div>
                <div className="q-count">
                    <IoIosTime />
                    <p>Minimum Wait :</p>
                    {/* {console.log("mwt", minWaitTime)} */}
                    <span>{minWaitTime >= 0 ? minWaitTime : "-"}</span>
                </div>
            </div>
            <button disabled={btn.isDisabled} className={`btn ${btn.type} ${btn.isDisabled && "btn-disabled"}`} onClick={() => btn.onClickHandler()} >{btn.text}</button>
        </div>
    )
}

export default Counter
