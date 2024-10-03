import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import DropDown from '../components/DropDown'

const Login = ({ handleLogin }) => {

    const [loginDets, setLoginDets] = useState({
        role: "customer",
        username: "johndoe",
        password: "securePassword123"
    });
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    function fillLoginDetails(role) {
        let username = "";
        let password = "";
        if (role == "customer") {
            username = "johndoe"
            password = "securePassword123"
        }
        else if (role == "shopowner") {
            username = "davidgreen"
            password = "hashedpassword654"
        }
        else if (role == "employee") {
            username = "lindajohnson"
            password = "hashedpassword456"
        }
        setLoginDets({
            role,
            username,
            password
        })
    }

    function updData(field, value) {
        if (field == "role") {
            fillLoginDetails(value);
        }
        setLoginDets(prvDets => {
            prvDets[field] = value;
            return { ...prvDets }
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const loginRes = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/sign-in`, { ...loginDets });
        // localStorage.setItem("auth", JSON.stringify(loginRes.data.auth));
        handleLogin(loginRes.data.auth);
        // here first check if passsword is invalid, then navigate
        console.log("lr", loginRes);

        if (loginRes.data.success) {
            if (loginRes.data.auth.role == "customer") {
                navigate("/customer/search-shop");
            }
            else if (loginRes.data.auth.role == "shopowner") {
                navigate("/shopowner/shop-owner-dash");
            }
            else if (loginRes.data.auth.role == "employee") {
                navigate("/employee/employee-dash");
            }
        }
        else {
            setErrorMsg(loginRes.data.message);
            // alert(loginRes.data.message);
            console.log(loginRes.status, loginRes.data.message);
        }
    }

    return (
        <div className='auth login'>
            <div className="auth-container">
                <h1>Login as {loginDets.role[0].toUpperCase() + loginDets.role.slice(1)}</h1>
                <div className="alert-msg">Credentials are already filled. Simply click on Login.</div>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="inp">
                        <DropDown label="User" onSelect={(val) => updData("role", val)} values={["customer", "shopowner", "employee"]} />
                    </div>
                    <div className="inp">
                        <label htmlFor="username">Username</label>
                        <input type="text" onChange={(e) => updData("username", e.target.value)} value={loginDets.username} placeholder='Enter Username' name="username" id="username" />
                    </div>
                    <div className="inp">
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={(e) => updData("password", e.target.value)} value={loginDets.password} placeholder='Enter Password' name="password" id="password" />
                    </div>
                    {/* <div className='forgot-password'>Forgot Password?</div> */}
                    <div className="error-msg">{errorMsg}</div>
                    <button className="auth-submit btn">
                        Login
                    </button>
                    <div className="log-reg-text">
                        Don't have an account? <Link to="/register">Register here</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
