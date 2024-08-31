import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DropDown from '../components/DropDown'

const Login = () => {

    const [loginDets, setLoginDets] = useState({
        role: "customer",
        username: "",
        password: ""
    });

    function updData(field, value) {
        setLoginDets(prvDets => {
            prvDets[field] = value;
            return { ...prvDets }
        })
    }

    async function handleSubmit() {
        const loginRes = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/sign-in`, { ...loginDets });
        localStorage.setItem("auth", JSON.stringify(loginRes.data.auth));
    }

    return (
        <div className='auth login'>
            <div className="auth-container">
                <h1>Login</h1>
                <div className="auth-form">
                    <div className="inp">
                        <DropDown label="User" onSelect={(val) => updData("role", val)} values={["Customer", "Employee", "Shopowner"]} />
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
