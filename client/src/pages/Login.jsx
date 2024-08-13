import React from 'react'
import { Link } from 'react-router-dom'
import DropDown from '../components/DropDown'

const Login = () => {
    return (
        <div className='auth login'>
            <div className="auth-container">
                <h1>Login</h1>
                <div className="auth-form">
                    <div className="inp">
                        <DropDown label="User" values={["Customer", "Employee", "Shopowner"]} />
                    </div>
                    <div className="inp">
                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder='Enter Username' name="username" id="username" />
                    </div>
                    <div className="inp">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='Enter Password' name="password" id="password" />
                    </div>
                    <div className='forgot-password'>Forgot Password?</div>
                    <button className="auth-submit btn">
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