import React, { useEffect, useState } from 'react'
import DropDown from '../components/DropDown'
import "../styles/SearchShop.css"
import ShopCard from '../components/ShopCard'
import axios from 'axios'

// state city API   pending > API key

const SearchShop = () => {

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    const [location, setLocation] = useState({});
    const [shops, setShops] = useState([]);

    // To fetch State, city
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "API_KEY");


    useEffect(() => {
        const getStates = async () => {

            var requestOptions = {
                method: 'GET',
                headers: headers,
                redirect: 'follow'
            };

            const response = await fetch("https://api.countrystatecity.in/v1/countries/IN/states", requestOptions);

            console.log(response);

            // .then(response => response.text())
            // .then(result => console.log(result))
            // .catch(error => console.log('error', error));

            // const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/shops/get-states`);
            // // console.log(response);
            // setStates(response.data.states);
        }
        getStates();
    }, []);

    const getCities = async (stateId) => {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/shops/get-cities/${stateId}`);
        setLocation(prvLoc => {
            prvLoc.state = response.data.state;
            return { ...prvLoc };
        });
        // console.log("cts", response.data.cities);
        setCities(response.data.cities);
    }

    const getAreas = async (cityId) => {
        const city = cities.filter((city) => city._id == cityId)[0];
        const areasArr = city.areas;
        setLocation(prvLoc => {
            prvLoc.city = city.name;
            return { ...prvLoc };
        });
        // console.log("ara", areasArr);
        setAreas(areasArr);
    }

    const getShops = async () => {
        console.log("lc", location);

        if (location.state && location.city && location.area) {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/shops/get-shops/${location.state}/${location.city}/${location.area}`);
            console.log(response.data.shops);
            setShops(response.data.shops);
        }
        else {
            console.log("Select all fields State, City, Area");
        }

    }

    return (
        <div className='search-shop'>
            <h1>Search Shop</h1>
            <div className="search-bar">
                <DropDown label="State" values={["-Select-", ...states]} onSelect={getCities} />
                <DropDown label="City" values={["-Select-", ...cities]} onSelect={getAreas} />
                <div className="search-bar">
                    <label htmlFor="shop-name">Shop Name</label>
                    <input type="text" onChange={(e) => { }} placeholder='Enter Shop Name' name="shop-name" id="shop-name" />
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
                    {shops.length > 0 ? shops.map((shop) => {
                        return <ShopCard key={shop._id} ownerName={`${shop.firstName} ${shop.lastName}`} id={shop._id} {...shop.shop} />
                    }) : "No Shops"}
                </div>
            </div>
        </div>
    )
}

export default SearchShop
