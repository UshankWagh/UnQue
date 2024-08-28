import React from 'react'
import '../styles/ShopImage.css'

const ShopImage = ({ shopName, shop_img }) => {
    return (


        <div className="shop-dets">
            {/* 
            
            
            avatar
            address
            ownerName 
            
            
            */}
            <div className="shop-desc">
                <p className='name'>{shopName}</p>
            </div>
            <img src={shop_img} alt="" />
        </div>
    )
}

export default ShopImage
