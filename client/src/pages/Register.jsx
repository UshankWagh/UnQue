import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DropDown from '../components/DropDown'
import axios from 'axios';

const Register = ({ handleLogin }) => {

    const [registerDets, setRegisterDets] = useState({
        role: "customer"
    });
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        const getStates = async () => {
            // console.log("stt", stateIsLoading);

            // setStateIsLoading(true);

            var headers = new Headers();
            headers.set("X-CSCAPI-KEY", import.meta.env.VITE_COUNTRY_STATE_CITY_API_KEY);

            var requestOptions = {
                method: 'GET',
                headers: headers,
                redirect: 'follow'
            };

            fetch("https://api.countrystatecity.in/v1/countries/IN/states", requestOptions)
                .then(response => response.text())
                .then(result => {
                    setStates(JSON.parse(result));
                    // setStateIsLoading(false);
                })
                .catch(error => console.log('error', error));

        }
        getStates();
    }, []);

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

                // setLocation(prvLoc => {
                //     prvLoc.state = state.name;
                //     return { ...prvLoc };
                // });
                updData("state", state.name);

                setCities(() => {
                    // return JSON.parse(result);
                    return JSON.parse(result).map((city, idx) => ({ "_id": city.id, "name": city.name }));
                });
            })
            .catch(error => console.log('error', error));
    }

    function updData(field, value) {
        setRegisterDets(prvDets => {
            prvDets[field] = value;
            return { ...prvDets }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const registerRes = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/sign-up`, { ...registerDets });
        if (registerRes.data.success) {
            // localStorage.setItem("auth", JSON.stringify(registerRes.data.auth));
            handleLogin(registerRes.data.auth);
            // navigate("/customer/search-shop");
            if (registerRes.data.auth.role == "customer") {
                navigate("/search-shop");
            }
            else if (registerRes.data.auth.role == "shopowner") {
                navigate("/shopowner/shop-owner-dash");
            }
        }
        else {
            console.log(registerRes.data.message);
            alert("Error: ", registerRes.data.message);
        }
    }

    console.log(registerDets);

    return (
        <div className='auth register'>
            <div className="auth-container">
                <h1>Register as {registerDets.role[0].toUpperCase() + registerDets.role.slice(1)}</h1>
                <form onSubmit={(e) => handleSubmit(e)} className="auth-form">
                    <div className="inp">
                        <DropDown label="User" onSelect={(val) => { setRegisterDets({}); updData("role", val) }} values={["customer", "shopowner"]} />
                    </div>
                    <div className="name-input">
                        <div className="inp">
                            <label htmlFor="first-name">First Name: </label>
                            <input type="text" onChange={(e) => updData("firstName", e.target.value)} placeholder='Enter First Name' name="first-name" id="first-name" />
                        </div>
                        <div className="inp">
                            <label htmlFor="last-name">Last Name</label>
                            <input type="text" onChange={(e) => updData("lastName", e.target.value)} placeholder='Enter Last Name' name="last-name" id="last-name" />
                        </div>
                    </div>
                    {/* shoponwer */}
                    {registerDets.role == "shopowner" && <>
                        <div className="inp">
                            <label htmlFor="shop-name">Shop Name</label>
                            <input type="text" onChange={(e) => updData("shopName", e.target.value)} placeholder='Enter Shop Name' name="shop-name" id="shop-name" />
                        </div>
                        <div className="inp">
                            <label htmlFor="counters">Counters</label>
                            <input type="number" onChange={(e) => updData("counters", e.target.value)} placeholder='Enter number Counters' name="counters" id="counters" />
                        </div>
                        {/* <div className="inp">
                            <label htmlFor="wait-time">Minimum Wait Time</label>
                            <input type="number" onChange={(e) => updData("minWaitTime", e.target.value)} placeholder='Enter Minimum Wait time in Minutes' name="wait-time" id="wait-time" />
                        </div> */}
                    </>}

                    {/* common */}
                    <div className="location-input">
                        <div className="inp">
                            <DropDown label="State" values={["-Select-", ...states]} onSelect={getCities} />
                        </div>
                        <div className="inp">
                            <DropDown label="City" values={["-Select-", ...cities]} onSelect={(cityId) => {
                                const city = cities.find(ct => ct._id == cityId);
                                updData("city", city.name);
                            }} />
                        </div>

                        <div className="inp">
                            <label htmlFor="area">Area: </label>
                            <input type="text" onChange={(e) => updData("area", e.target.value)} placeholder='Enter Your Area' name="area" id="area" />
                        </div>
                    </div>
                    <div className="inp">
                        <label htmlFor="username">Username</label>
                        <input type="text" onChange={(e) => updData("username", e.target.value)} placeholder='Enter Username' name="username" id="username" />
                    </div>
                    <div className="inp">
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={(e) => updData("password", e.target.value)} placeholder='Enter Password' name="password" id="password" />
                    </div>
                    <div className="contact-input">
                        <div className="inp">
                            <label htmlFor="phoneNo">PhoneNo</label>
                            <input type="number" onChange={(e) => updData("phoneNo", e.target.value)} placeholder='Enter PhoneNo' name="phoneNo" id="phoneNo" />
                        </div>
                        <div className="inp checkbox-inp">
                            <label htmlFor="phone-notify">Get notification on phone:</label>
                            <input type="checkbox" onChange={(e) => updData("phoneNotify", e.target.checked)} name="phone-notify" id="phone-notify" />
                        </div>
                    </div>
                    <div className="contact-input">
                        <div className="inp">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={(e) => updData("email", e.target.value)} placeholder='Enter Email' name="email" id="email" />
                        </div>
                        <div className="inp checkbox-inp">
                            <label htmlFor="email-notify">Get notification on email:</label>
                            <input type="checkbox" onChange={(e) => updData("emailNotify", e.target.checked)} name="email-notify" id="phone-notify" />
                        </div>
                    </div>
                    <button className="auth-submit btn" type="submit">
                        Register
                    </button>
                    <div className="log-reg-text">
                        Already have an account? <Link to="/login">Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
