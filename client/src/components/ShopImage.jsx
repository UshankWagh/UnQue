import React from 'react'
import '../styles/ShopImage.css'

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
                        {shopAddress}<br />
                        {shopOwnerName}
                    </div>
                </div>
            </div>
            <img src={shop_img} alt="" />
        </div>
    )
}

export default ShopImage
