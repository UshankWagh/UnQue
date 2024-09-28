import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import DropDown from '../components/DropDown'

const Login = () => {

    const [loginDets, setLoginDets] = useState({
        role: "customer",
        username: "",
        password: ""
    });

    const navigate = useNavigate()

    function updData(field, value) {
        setLoginDets(prvDets => {
            prvDets[field] = value;
            return { ...prvDets }
        })
    }
    console.log(loginDets);


    async function handleSubmit() {
        const loginRes = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/sign-in`, { ...loginDets });
        localStorage.setItem("auth", JSON.stringify(loginRes.data.auth));
        // here first check if passsword is invalid, then navigate

        if (loginRes.status == 200) {
            if (loginRes.data.auth.role == "customer") {
                navigate("/customer/search-shop");
            }
            else if (loginRes.data.auth.role == "shopowner") {
                navigate("/shopowner/shop-owner-dash");
            }
        }
        else {
            console.log(loginRes.status, loginRes.data);
        }
    }

    return (
        <div className='auth login'>
            <div className="auth-container">
                <h1>Login</h1>
                <div className="auth-form">
                    <div className="inp">
                        <DropDown label="User" onSelect={(val) => updData("role", val)} values={["customer", "employee", "shopowner"]} />
                    </div>
                    <div className="inp">
                        <label htmlFor="username">Username</label>
                        <input type="text" onChange={(e) => updData("username", e.target.value)} placeholder='Enter Username' name="username" id="username" />
                    </div>
                    <div className="inp">
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={(e) => updData("password", e.target.value)} placeholder='Enter Password' name="password" id="password" />
                    </div>
                    <div className='forgot-password'>Forgot Password?</div>
                    <button className="auth-submit btn" onClick={handleSubmit}>
                        Login
                    </button>
                    <div className="log-reg-text">
                        Don't have an account? <Link to="/register">Register here</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
