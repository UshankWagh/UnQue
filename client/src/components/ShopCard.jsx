import React from 'react'
import shop from "../assets/shop.png"
import { FaShop } from "react-icons/fa6";
import { MdOutlineLocationOn } from "react-icons/md";
import { Link } from 'react-router-dom';

const ShopCard = () => {
    return (
        <div className='shop-card'>
            <div className="shop-image">
                <img src={shop} alt="" />
            </div>
            <div className="shop-card-body">
                <div className="shop-name">
                    {/* <div className="shp-logo">
                        <FaShop />
                    </div> */}
                    <div className="shp-text s-name">Shop Name</div>
                </div>
                <div className="shop-address">
                    <div className="shp-logo">
                        <MdOutlineLocationOn />
                    </div>
                    <div className="shp-text s-address">Shop Adress Lorem ipsum dolor sit amet.</div>
                </div>
                <div className="btns">
                    <Link to='/shop' className="btn view-btn">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ShopCard