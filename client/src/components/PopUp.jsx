import React from 'react'
import { LiaTimesSolid } from "react-icons/lia";
import { FaRegTimesCircle } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { TiTimes } from "react-icons/ti";

const PopUp = ({ title, desc, confirmation }) => {
    return (
        <div className='popup-bg'>
            <div className="popup">
                <div className="cross" onClick={() => confirmation(false)}>
                    <LiaTimesSolid />
                </div>
                <div className="popup-head">{title}</div>
                <div className="popup-text">
                    {desc}
                </div>
                <div className="conf-btns">
                    <button className="btn yes-btn" onClick={() => confirmation(true)}>Yes</button>
                    <button className="btn cancel-btn" onClick={() => confirmation(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default PopUp
