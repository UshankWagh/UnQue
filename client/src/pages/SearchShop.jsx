import React, { useEffect, useState } from 'react'
import DropDown from '../components/DropDown'
import "../styles/SearchShop.css"
import ShopCard from '../components/ShopCard'
import axios from 'axios'

// state city API   pending > API key
// WE9Pd0ljaW9pR2kyTGs5S2hZZE9ZdFhCc3JhOFFaMnFEN244Z3JQaA==

const SearchShop = () => {

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [shopKeyword, setshopKeyword] = useState("");
    const [location, setLocation] = useState({});
    const [shops, setShops] = useState([]);

    // To fetch State, city


    useEffect(() => {
        const getStates = async () => {

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

        if (location.state && location.city && shopKeyword) {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/shops/get-shops`, {
                state: location.state,
                city: location.city,
                shopKeyword
            });
            console.log(response.data.shops);
            setShops(response.data.shops);
        }
        else {
            console.log("Select all fields State, City, Shop Keyword");
        }


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


    return (
        <div className='search-shop'>
            <h1>Search Shop</h1>
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
            </div>
            <div className="shops">
                <div className="shops-head">Shops</div>
                <div className="shop-list">
                    {/* <ShopCard /> */}
                    {shops.length > 0 ? shops.map((shop, ind) => {
                        return <ShopCard key={shop._id} ind={ind} ownerName={`${shop.firstName} ${shop.lastName}`} id={shop._id} {...shop.shop} />
                    }) : "No Shops Found !!"}
                    {/* {shops.length > 0 ? shops.map((shop, ind) => {
                        return <ShopCard key={shop._id} ind={ind} ownerName={`${shop.firstName} ${shop.lastName}`} id={shop._id} {...shop.shop} />
                    }) : "No Shops Found !!"}
                    {shops.length > 0 ? shops.map((shop, ind) => {
                        return <ShopCard key={shop._id} ind={ind} ownerName={`${shop.firstName} ${shop.lastName}`} id={shop._id} {...shop.shop} />
                    }) : "No Shops Found !!"} */}
                </div>
            </div>
        </div>
    )
}

export default SearchShop
