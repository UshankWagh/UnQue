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
                    <div className="counter-no">0{no}</div>
                    <div className={`open-close ${isOpen ? "open" : "closed"}`}>{isOpen ? "Open" : "Closed"}</div>
                </div>
                <div className="counter-field">
                    <FaPeopleGroup />
                    <p className='field-name'>Customer(s) </p>:
                    <p className='field-data'>{queueCount}</p>
                </div>
                <div className="counter-field">
                    <IoIosTime />
                    <p className='field-name'>Minimum Wait :</p>
                    {/* {console.log("mwt", minWaitTime)} */}
                    <span className='field-data'>{minWaitTime >= 0 ? minWaitTime : "-"}</span>
                </div>
            </div>
            <button disabled={btn.isDisabled} className={`btn ${btn.type} ${btn.isDisabled && "btn-disabled"}`} onClick={() => btn.onClickHandler()} >{btn.text}</button>
        </div>
    )
}

export default Counter
