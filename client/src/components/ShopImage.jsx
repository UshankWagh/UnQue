import React from 'react'
import '../styles/ShopImage.css'
import { FaLocationDot } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import Ratings from './Ratings';

const ShopImage = ({ shopName, shopOwnerName, shopAddress, shop_img }) => {
    return (


        <div className="shop-dets">
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
                            <Ratings starsCount={3} />
                        </div>
                    </div>
                </div>
            </div>
            <img src={shop_img} alt="" />
        </div>
    )
}

export default ShopImage
