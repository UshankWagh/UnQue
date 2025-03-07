import React, { useEffect, useState } from 'react'
import DropDown from '../components/DropDown'
import "../styles/SearchShop.css"
import ShopCard from '../components/ShopCard'
import axios from 'axios'
import Loading from '../components/Loading'
import shop_img2 from '../assets/images/shop_img2.jpg'
import { CgMouse } from "react-icons/cg";

// state city API   pending > API key
// WE9Pd0ljaW9pR2kyTGs5S2hZZE9ZdFhCc3JhOFFaMnFEN244Z3JQaA==

const SearchShop = () => {

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [shopKeyword, setshopKeyword] = useState("");
    const [location, setLocation] = useState({});
    const [shops, setShops] = useState([]);
    const [alertMsg, setAlertMsg] = useState("");
    const [shopIsLoading, setShopIsLoading] = useState(false);
    const [stateIsLoading, setStateIsLoading] = useState(true);

    // To fetch State, city


    useEffect(() => {
        const getStates = async () => {
            console.log("stt", stateIsLoading);

            // setStateIsLoading(true);

            var headers = new Headers();
            headers.set("X-CSCAPI-KEY", import.meta.env.VITE_COUNTRY_STATE_CITY_API_KEY);
            // headers.set("Content-Type", "text/html");
            // console.log(headers.get("Content-Type"));

            // console.log("headers", headers, headers.get("X-CSCAPI-KEY"), import.meta.env.VITE_COUNTRY_STATE_CITY_API_KEY);

            var requestOptions = {
                method: 'GET',
                headers: headers,
                redirect: 'follow'
            };

            fetch("https://api.countrystatecity.in/v1/countries/IN/states", requestOptions)
                .then(response => response.text())
                .then(result => {
                    setStates(JSON.parse(result));
                    setStateIsLoading(false);
                })
                .catch(error => console.log('error', error));



            // const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/shops/get-states`);
            // // console.log(response);
            // setStates(response.data.states);
        }
        getStates();
    }, []);

    // const getCities = async (stateId) => {
    //     const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/shops/get-cities/${stateId}`);
    //     setLocation(prvLoc => {
    //         prvLoc.state = response.data.state;
    //         return { ...prvLoc };
    //     });
    //     // console.log("cts", response.data.cities);
    //     setCities(response.data.cities);
    // }

    // const getAreas = async (cityId) => {
    //     const city = cities.filter((city) => city._id == cityId)[0];
    //     const areasArr = city.areas;
    //     setLocation(prvLoc => {
    //         prvLoc.city = city.name;
    //         return { ...prvLoc };
    //     });
    //     // console.log("ara", areasArr);
    //     setAreas(areasArr);
    // }

    const getCities = async (stateCode) => {

        var headers = new Headers();
        headers.append("X-CSCAPI-KEY", import.meta.env.VITE_COUNTRY_STATE_CITY_API_KEY);

        var requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        fetch(`https://api.countrystatecity.in/v1/countries/IN/states/${stateCode}/cities`, requestOptions)
            .then(response => response.text())
            .then(result => {

                const state = states.find(st => st.iso2 == stateCode);

                setLocation(prvLoc => {
                    prvLoc.state = state.name;
                    return { ...prvLoc };
                });

                setCities(() => {
                    // return JSON.parse(result);
                    return JSON.parse(result).map((city, idx) => ({ "_id": city.id, "name": city.name }));
                });
            })
            .catch(error => console.log('error', error));
    }

    const getShops = async () => {
        setShopIsLoading(true);
        if (location.state && location.city && shopKeyword) {
            setAlertMsg("");
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/shops/get-shops`, {
                state: location.state,
                city: location.city,
                shopKeyword
            });
            console.log(response.data.shops);
            setShops(response.data.shops);
        }
        else {
            setAlertMsg("Please select all fields State, City, Shop Keyword");
        }
        setShopIsLoading(false);


        // if (location.state && location.city && location.area) {
        //     const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/shops/get-shops/${location.state}/${location.city}/${location.area}`);
        //     console.log(response.data.shops);
        //     setShops(response.data.shops);
        // }
        // else {
        //     console.log("Select all fields State, City, Area");
        // }

    }

    // [
    //   {id: 4006, name: 'Meghalaya', iso2: 'ML'},
    //   {id: 4007, name: 'Haryana', iso2: 'HR'},
    //   {id: 4008, name: 'Maharashtra', iso2: 'MH'}
    // ]

    // [
    //   {id: 131520, name: 'Cherrapunji', latitude: '25.30089000', longitude: '91.69619000'},
    //   {id: 131824, name: 'East Garo Hills', latitude: '25.61372000', longitude: '90.62426000'},
    //   {id: 131825, name: 'East Jaintia Hills', latitude: '25.35976000', longitude: '92.36680000'}
    // ]  

    const HomeImage = ({ }) => {
        return (
            <div className="home-image">
                <div className="home-desc">
                    <div className="main-text">
                        Welcome to EFFIQ
                    </div>
                    <div className="sec-text">
                        Your one stop solution for Escaping the <br /> Long wait times at Shops
                    </div>
                    <button className='btn search-btn home-cta'>Save Time <CgMouse /></button>
                </div>
                <div className="home-img">
                    <img src={shop_img2} alt="" />
                </div>
            </div>
        )
    }

    return (
        <div className='search-shop'>
            <h1>Search Shop</h1>
            <HomeImage shopName="shopName" shopOwnerName="ownerName" shopAddress="Address" shop_img={shop_img2} hideDesc={true} />
            <div className="shops-head search">Search</div>
            <div className="srch-br helper-txt">Select shop location and search for desired shop</div>
            {stateIsLoading ? <Loading /> :
                <div className="search-bar">
                    <DropDown label="State" values={["-Select-", ...states]} onSelect={getCities} />
                    <DropDown label="City" values={["-Select-", ...cities]} onSelect={(cityId) => {
                        setLocation(prvLoc => {
                            const city = cities.find(ct => ct._id == cityId);
                            prvLoc.city = city.name;
                            return { ...prvLoc };
                        });
                    }} />
                    <div className="search-inp">
                        <label htmlFor="shop-name">Shop Name / Keyword</label>
                        <input type="text" value={shopKeyword} onChange={(e) => { setshopKeyword(e.target.value) }} placeholder='Keyword of Shop' name="shop-name" id="shop-name" />
                    </div>

                    {/* <DropDown label="Area" values={["-Select-", ...areas]} onSelect={(area) => {
                    setLocation(prvLoc => {
                        prvLoc.area = area;
                        return { ...prvLoc };
                    });
                }} /> */}
                    <button className='btn search-btn' onClick={getShops}>Search</button>
                </div>}
            <div className="alert-msg">{alertMsg}</div>
            <div className="shops">
                <div className="shops-head">Shops</div>
                {shops.length > 0 && <div className="helper-txt">Showing Shops based on your search...</div>}
                {shopIsLoading ? <Loading /> :
                    <div className="shop-list">
                        {/* <ShopCard /> */}
                        {shops.length > 0 ? shops.map((shop, ind) => {
                            return <ShopCard key={shop._id} ind={ind} ownerName={`${shop.firstName} ${shop.lastName}`} id={shop._id} {...shop.shop} />
                        }) : "No Shops Found !!"}
                    </div>}
            </div>
        </div>
    )
}

export default SearchShop
