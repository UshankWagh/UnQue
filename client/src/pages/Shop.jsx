import React, { useEffect, useState } from 'react'
import PopUp from '../components/PopUp'
import '../styles/Shop.css';
import shop_img from '../assets/images/shop_img.png'
import Counter from '../components/Counter'
import ShopImage from '../components/ShopImage'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios';

const Shop = () => {

    const [shop, setShop] = useState(
        // {
        //     "shop": {
        //         "shopImg": "https://example.com/shops/shop6.jpg",
        //         "shopName": "Evergreen Grocery",
        //         "address": "202 Fresh Lane, Shelbyville",
        //         "counters": [
        //             {
        //                 "_id": "66cf67b839118c95dc8bda48",
        //                 "queue": {
        //                     "_id": "66b9157e976f6aa9f7766497",
        //                     "shopownerId": "66b911492cc0c1620b918462",
        //                     "shopName": "Evergreen Grocery",
        //                     "counterNo": 1,
        //                     "isOpen": true,
        //                     "queueCount": 5,
        //                     "firstTicket": "A101",
        //                     "lastTicket": "A105",
        //                     "cancelledTickets": [
        //                         "A102",
        //                         "A104"
        //                     ]
        //                 },
        //                 "counterNo": 1
        //             },
        //             {
        //                 "_id": "66cf67b839118c95dc8bda49",
        //                 "queue": {
        //                     "_id": "66b9159e976f6aa9f7766498",
        //                     "shopownerId": "66b911492cc0c1620b918462",
        //                     "shopName": "Evergreen Grocery",
        //                     "counterNo": 2,
        //                     "isOpen": false,
        //                     "queueCount": 3,
        //                     "firstTicket": "B201",
        //                     "lastTicket": "B203",
        //                     "cancelledTickets": [
        //                         "B202"
        //                     ]
        //                 },
        //                 "counterNo": 2
        //             }
        //         ],
        //         "area": "Downtown",
        //         "city": "Los Angeles",
        //         "state": "California"
        //     },
        //     "_id": "66b911492cc0c1620b918462",
        //     "ownerName": "David Green",
        //     "avatar": "https://example.com/avatars/davidgreen.jpg"
        // }
    );
    const [counterNo, setCounterNo] = useState();
    const [joinedQs, setJoinedQs] = useState([
        "66b9159e976f6aa9f7766498"
    ])

    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        const getShop = async () => {
            const shopId = searchParams.get("shopid");
            const shopRes = await axios.get(`http://localhost:5000/shops/get-shop/${shopId}`);
            const joinedQsRes = await axios.get(`http://localhost:5000/counters/get-joined-qs/${"66b91038976f6aa9f7766492"}`);
            console.log(shopRes.data.shop, joinedQsRes);
            setJoinedQs(joinedQsRes.data.joinedQs);
            setShop(shopRes.data.shop);
        }
        getShop();
    }, []);

    console.log(shop);

    const handleJoinQueue = (join) => {
        if (join) {
            setCounterNo(0)
            // inc qCount and ticket by 1 in queue
            // store ticket and queueid in customer
            navigate("/queues")
            console.log("joined queue");
        }
        else {
            setCounterNo(0);
        }
    }

    return (
        <div className="shop">
            {counterNo > 0 && <PopUp title="Confirmation" desc={`Are you sure to join queue of Counter No. ${counterNo}`} confirmation={handleJoinQueue} />}
            <h1>Shop</h1>
            <ShopImage shopName={"Phoneix Foods"} shop_img={shop_img} />
            <div className='sub-head'>Counters</div>
            <div className="counters">
                {shop && shop.shop.counters.map((counter) => {
                    const qid = counter.queue._id;
                    let text = "Join";
                    console.log("qid", qid);
                    if (joinedQs.includes(qid)) {
                        text = "Cancel";
                        console.log("Joined");
                    }
                    return <Counter key={counter.counterNo} no={counter.counterNo} queueCount={counter.queue.queueCount} btn={{ text, type: "btn", onClickHandler: () => setCounterNo(counter.counterNo) }} />
                })}
            </div>
        </div>
    )
}

export default Shop
