import React from 'react'
import PopUp from '../components/PopUp'
import '../styles/Shop.css';
import shop_img from '../assets/images/shop_img.png'
import Counter from '../components/Counter'
import ShopImage from '../components/ShopImage'
import { useNavigate } from 'react-router-dom'

const Shop = () => {

    const navigate = useNavigate()

    const handleRedirect = () => {
        navigate("/counter")
    }

    return (
        <div className="shop">
            {/* <PopUp /> */}
            <h1>Shop</h1>
            <ShopImage shopName={"Phoneix Foods"} shop_img={shop_img} />
            <div className='sub-head'>Counters</div>
            <div className="counters">
                <Counter no={1} queueCount={20} btn={{ text: "Open", type: "btn", onClickHandler: handleRedirect }} />
                <Counter no={1} queueCount={20} btn={{ text: "Open", type: "btn", onClickHandler: handleRedirect }} />
                <Counter no={1} queueCount={20} btn={{ text: "Open", type: "btn", onClickHandler: handleRedirect }} />
                <Counter no={1} queueCount={20} btn={{ text: "Open", type: "btn", onClickHandler: handleRedirect }} />
                <Counter no={1} queueCount={20} btn={{ text: "Open", type: "btn", onClickHandler: handleRedirect }} />
                <Counter no={1} queueCount={20} btn={{ text: "Open", type: "btn", onClickHandler: handleRedirect }} />
            </div>
        </div>
    )
}

export default Shop