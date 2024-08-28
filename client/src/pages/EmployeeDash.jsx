import React, { useEffect, useState } from 'react'
import '../styles/EmployeeDash.css';
import shop_img from '../assets/images/shop_img.png'
import Counter from '../components/Counter';
import ShopImage from '../components/ShopImage';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const EmployeeDash = () => {

    const [shopName, setShopName] = useState("");
    const [shopImg, setShopImg] = useState("");
    const [shopCounters, setShopCounters] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        const loadData = async () => {
            const resp = await axios.get(`${import.meta.env.VITE_SERVER_URL}/shops/shop-dets/66b911492cc0c1620b918462`);

            if (resp.data.success) {
                const shop = resp.data.shop
                setShopName(shop.shopName)
                setShopImg(shop.shopImg)
                setShopCounters(shop.counters)
            }
        }

        loadData()
    }, [])


    const handleRedirect = (no) => {
        navigate(`/counter?shopId=66b911492cc0c1620b918462&counterNo=${no}`)
    }



    return (
        <div className='employee-dash'>
            <h1>Employee Dashboard</h1>

            {/* Image is static */}
            <ShopImage shopName={shopName} shop_img={shop_img} />
            <div className='sub-head'>Counters</div>
            <div className="counters">
                {
                    shopCounters.map((counter, index) => {
                        return <Counter no={counter.counterNo} queueCount={counter.queue.queueCount} btn={{ text: "Open", type: "btn", onClickHandler: handleRedirect }} key={index} />
                    })
                }
                {/* <Counter no={1} queueCount={20} btn={{ text: "Open", type: "btn", onClickHandler: handleRedirect }} />
                <Counter no={1} queueCount={20} btn={{ text: "Open", type: "btn", onClickHandler: handleRedirect }} />
                <Counter no={1} queueCount={20} btn={{ text: "Open", type: "btn", onClickHandler: handleRedirect }} />
                <Counter no={1} queueCount={20} btn={{ text: "Open", type: "btn", onClickHandler: handleRedirect }} />
                <Counter no={1} queueCount={20} btn={{ text: "Open", type: "btn", onClickHandler: handleRedirect }} /> */}
            </div>
        </div>
    )
}

export default EmployeeDash
