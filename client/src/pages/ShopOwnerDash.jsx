import React, { useEffect, useState } from 'react'
import shop_img from '../assets/images/shop_img.png'
import Counter from '../components/Counter';
import ShopImage from '../components/ShopImage';
import '../styles/ShopOwnerDash.css'
import axios from 'axios'

const ShopOwnerDash = () => {

    const [shopName, setShopName] = useState("");
    const [shopImg, setShopImg] = useState("");
    const [shopCounters, setShopCounters] = useState([]);
    const [shopEmployees, setShopEmployees] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const resp = await axios.get(`${import.meta.env.VITE_SERVER_URL}/shops/shop-dets/66b911492cc0c1620b918462`);

            if (resp.data.success) {
                const shop = resp.data.shop
                setShopName(shop.shopName)
                setShopImg(shop.shopImg)
                setShopCounters(shop.counters)
                setShopEmployees(shop.employees)
            }
        }

        loadData()
    }, [])


    const deleteCounter = async (counterNo) => {
        const resp = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/counters/delete-counter/66b911492cc0c1620b918462/${counterNo}`);
        if (resp.data.success) {
            alert(resp.data.message)
        }
        else {
            alert(resp.data.error)
        }
    }

    return (
        <div className='shop-owner-dash'>
            <h1>Shop Owner Dashboard</h1>
            <ShopImage shopName={shopName} shop_img={shop_img} />
            <div className="counters-sec">
                <div className='sub-head'>Counters</div>
                <div className="add-btn">
                    <button className='btn'>Add Counter</button>
                </div>
                <div className="counters">
                    {
                        shopCounters.map((counter, index) => {
                            return <Counter no={counter.counterNo} queueCount={counter.queue.queueCount} btn={{ text: "Delete", type: "danger", onClickHandler: {} }} key={index} />
                        })
                    }
                </div>
            </div>

            <div className="employees-sec">
                <div className='sub-head'>Employees</div>
            </div>


        </div>
    )
}

export default ShopOwnerDash
