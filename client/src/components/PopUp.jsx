import React from 'react'
import { LiaTimesSolid } from "react-icons/lia";
import { FaRegTimesCircle } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { TiTimes } from "react-icons/ti";

const PopUp = () => {
    return (
        <div className='popup-bg'>
            <div className="popup">
                <div className="cross">
                    <LiaTimesSolid />
                    {/* <FaTimes /> */}
                    {/* <FaRegTimesCircle /> */}
                </div>
                <div className="popup-head">Confirmation</div>
                <div className="popup-text">
                    Are you sure to join the queue of counter no.1?
                </div>
                <div className="conf-btns">
                    <button className="btn yes-btn">Yes</button>
                    <button className="btn cancel-btn">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default PopUp