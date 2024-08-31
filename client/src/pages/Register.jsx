import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DropDown from '../components/DropDown'
import axios from 'axios';

const Register = () => {

    const [registerDets, setRegisterDets] = useState({
        role: "customer"
    });
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);

    useEffect(() => {
        const getShops = async () => {
            const response = await axios.get("http://localhost:5000/shops/get-states");
            // console.log(response);
            setStates(response.data.states);
        }
        getShops();
    }, []);

    // LEFT TO IMPLEMENT : get states cities areas

    const getCities = async (stateId) => {
        const response = await axios.get(`http://localhost:5000/shops/get-cities/${stateId}`);
        setCities(response.data.cities);
    }

    const getAreas = async (cityId) => {
        const city = cities.filter((city) => city._id == cityId)[0];
        const areasArr = city.areas;
        setAreas(areasArr);
    }

    function updData(field, value) {
        setRegisterDets(prvDets => {
            prvDets[field] = value;
            return { ...prvDets }
        })
    }

    console.log(registerDets);

    async function handleSubmit() {
        const registerRes = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/sign-up`, { ...registerDets });
        localStorage.setItem("auth", JSON.stringify(registerRes.data.auth));
    }

    return (
        <div className='auth register'>
            <div className="auth-container">
                <h1>Register</h1>
                <div className="auth-form">
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
                    {/* customer */}
                    {registerDets.role == "customer" && <>
                        <div className="inp">
                            <label htmlFor="phoneNo">PhoneNo</label>
                            <input type="number" onChange={(e) => updData("phoneNo", e.target.value)} placeholder='Enter PhoneNo' name="phoneNo" id="phoneNo" />
                        </div>
                    </>}

                    {/* shoponwer */}
                    {registerDets.role == "shopowner" && <>
                        <div className="inp">
                            <label htmlFor="shop-name">Shop Name</label>
                            <input type="text" onChange={(e) => updData("shopName", e.target.value)} placeholder='Enter Shop Name' name="shop-name" id="shop-name" />
                        </div>
                        <div className="inp">
                            <label htmlFor="counters">Counters</label>
                            <input type="number" onChange={(e) => updData("counters", e.target.value)} placeholder='Enter Counter No.' name="counters" id="counters" />
                        </div>
                    </>}

                    {/* common */}
                    <div className="name-input">
                        <div className="inp">
                            <DropDown onSelect={(val) => updData("state", val)} label="State" values={["Customer", "Employee", "Shopowner"]} />
                        </div>
                        <div className="inp">
                            <DropDown onSelect={(val) => updData("city", val)} label="City" values={["Customer", "Employee", "Shopowner"]} />
                        </div>
                        <div className="inp">
                            <DropDown onSelect={(val) => updData("area", val)} label="Area" values={["Customer", "Employee", "Shopowner"]} />
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
                    <div className="inp">
                        <label htmlFor="email">Email</label>
                        <input type="email" onChange={(e) => updData("email", e.target.value)} placeholder='Enter Email' name="email" id="email" />
                    </div>
                    <button className="auth-submit btn" onClick={handleSubmit}>
                        Register
                    </button>
                    <div className="log-reg-text">
                        Already have an account? <Link to="/login">Login here</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
