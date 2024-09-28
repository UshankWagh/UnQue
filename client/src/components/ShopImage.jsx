import React from 'react'
import '../styles/ShopImage.css'

const ShopImage = ({ shopName, ownerName, address, shop_img }) => {
    return (


        <div className="shop-dets">
            {/* 
            
            
            avatar
            address
            ownerName 
            
            
            */}
            <div className="shop-desc">
                <p className='name'>{shopName}</p>
                {ownerName}<br />
                {address}
            </div>
            <img src={shop_img} alt="" />
        </div>
    )
}

export default ShopImage
