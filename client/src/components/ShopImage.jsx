import React from 'react'
import '../styles/ShopImage.css'
import { FaLocationDot } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import Ratings from './Ratings';

const ShopImage = ({ shopName, shopOwnerName, shopAddress, shopImg, ratings }) => {
    return (


        <div className="shop-dets" style={{ backgroundImage: `url(${shopImg})` }}>
            {/* 
            
            
            avatar
            address
            ownerName 
            
            
            */}
            <div className="shop-desc">
                <div className='name'>
                    {shopName}<br />
                    <div className="oth-dets">
                        <div className="oth">
                            <FaUser /> {shopOwnerName}
                        </div>
                        <div className="oth">
                            <FaLocationDot /> {shopAddress}<br />
                        </div>
                        <div className="oth">
                            <Ratings starsCount={ratings} />
                        </div>
                    </div>
                </div>
            </div>
            {/* <img src={shopImg} alt="" /> */}
        </div>
    )
}

export default ShopImage
