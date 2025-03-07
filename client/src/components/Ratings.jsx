import React from 'react';
import { FaStar } from "react-icons/fa";
import { IoMdThumbsUp } from "react-icons/io";

const Ratings = ({ hideTitle, starsCount }) => {
    let stars = [false, false, false, false, false];
    for (let i = 0; i < 5; i++) {
        if (starsCount > 0) stars[i] = true;
        starsCount--;
    }

    return (
        <div className='ratings'>
            {!hideTitle && <span className='ratings-title'><IoMdThumbsUp /> Ratings : </span>}
            <span className="stars">
                {stars.map(star => {
                    if (star) return <span className="star star-y"><FaStar /></span>
                    return <span className="star star-w"><FaStar /></span>
                })}
            </span>
        </div>
    )
}

export default Ratings