import React from 'react'
import shop1 from "../assets/images/shop_img.png"
import shop2 from "../assets/images/shop_img2.jpg"
import { FaShop } from "react-icons/fa6";
import { MdOutlineLocationOn } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
import { RiUser3Fill } from "react-icons/ri";
import Ratings from './Ratings';

const ShopCard = ({ ownerName, shopName, shopImg, ind, address, id, state, city, area }) => {
    const shopImages = [shop1, shop2];
    return (
        <div className='shop-card'>
            <div className="shop-image">
                {/* <img src={shopImg.length ? shopImg : shop} alt="" /> */}
                <img src={shopName == "Evergreen Grocery" ? shopImages[0] : shopImages[1]} alt="" />
            </div>
            <div className="shop-card-body">
                <div className="shop-name">
                    {/* <div className="shp-logo">
                        <FaShop />
                    </div> */}
                    <div className="shp-text s-name">{shopName}</div>
                </div>
                <Ratings starsCount={3} hideTitle={true} />
                <hr></hr>
                <div className="shop-address">
                    <div className="shp-logo">
                        <RiUser3Fill />
                    </div>
                    <div className="shp-text s-owner">Owner : {ownerName}</div>
                </div>
                <div className="shop-address">
                    <div className="shp-logo">
                        <MdOutlineLocationOn />
                    </div>
                    <div className="shp-text s-address">Address : {area}, {city}, {state}.</div>
                    {/* <div className="shp-text s-address">{address}{address}</div> */}
                </div>
                <div className="btns">
                    <Link to={`/customer/shop?shopid=${id}`} className="btn view-btn">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ShopCard
