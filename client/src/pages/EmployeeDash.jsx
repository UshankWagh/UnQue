import React from 'react'
import '../styles/EmployeeDash.css';
import shop_img from '../assets/images/shop_img.png'
import Counter from '../components/Counter';
import ShopImage from '../components/ShopImage';
import { useNavigate } from 'react-router-dom'

const EmployeeDash = () => {

    const navigate = useNavigate()

    const handleRedirect = () => {
        navigate("/counter")
    }

    return (
        <div className='employee-dash'>
            <h1>Employee Dashboard</h1>
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

export default EmployeeDash
