import React from 'react'
import shop from "../assets/images/shop.png"
import { FaShop } from "react-icons/fa6";
import { MdOutlineLocationOn } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
import { RiUser3Fill } from "react-icons/ri";

const ShopCard = ({ ownerName, shopName, shopImg, address, id, state, city, area }) => {
    return (
        <div className='shop-card'>
            <div className="shop-image">
                {/* <img src={shopImg.length ? shopImg : shop} alt="" /> */}
                <img src={shop} alt="" />
            </div>
            <div className="shop-card-body">
                <div className="shop-name">
                    {/* <div className="shp-logo">
                        <FaShop />
                    </div> */}
                    <div className="shp-text s-name">{shopName}</div>
                </div>
                <div className="shop-address">
                    <div className="shp-logo">
                        <RiUser3Fill />
                    </div>
                    <div className="shp-text s-owner">{ownerName}</div>
                </div>
                <div className="shop-address">
                    <div className="shp-logo">
                        <MdOutlineLocationOn />
                    </div>
                    <div className="shp-text s-address">{address}</div>
                </div>
                <div className="btns">
                    <Link to={`/shop?shopid=${id}`} className="btn view-btn">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ShopCard
