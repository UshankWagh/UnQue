import React from 'react'
import shop_img from '../assets/images/shop_img.png'
import Counter from '../components/Counter';
import ShopImage from '../components/ShopImage';
import '../styles/ShopOwnerDash.css'

const ShopOwnerDash = () => {
    return (
        <div className='shop-owner-dash'>
            <h1>Shop Owner Dashboard</h1>
            <ShopImage shopName={"Phoneix Foods"} shop_img={shop_img} />
            <div className="counters-sec">
                <div className='sub-head'>Counters</div>
                <div className="add-btn">
                    <button className='btn'>Add Counter</button>
                </div>
                <div className="counters">
                    <Counter no={1} queueCount={20} btn={{ text: "Delete", type: "danger", onClickHandler: {} }} />
                    <Counter no={1} queueCount={20} btn={{ text: "Delete", type: "danger", onClickHandler: {} }} />
                    <Counter no={1} queueCount={20} btn={{ text: "Delete", type: "danger", onClickHandler: {} }} />
                    {/* <Counter no={1} queueCount={20} btn={{ text: "Delete", type: "danger", onClickHandler: {} }} />
                    <Counter no={1} queueCount={20} btn={{ text: "Delete", type: "danger", onClickHandler: {} }} />
                    <Counter no={1} queueCount={20} btn={{ text: "Delete", type: "danger", onClickHandler: {} }} /> */}
                </div>
            </div>

            <div className="employees-sec">
                <div className='sub-head'>Employees</div>
            </div>


        </div>
    )
}

export default ShopOwnerDash
