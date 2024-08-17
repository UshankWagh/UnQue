import React from 'react'
import { Link } from 'react-router-dom'
import DropDown from '../components/DropDown'

const Register = () => {
    // name
    // avatar
    // email
    // Pno
    // state
    // username
    // password
    return (
        <div className='auth register'>
            <div className="auth-container">
                <h1>Register</h1>
                <div className="auth-form">
                    <div className="inp">
                        <DropDown label="User" values={["Customer", "Employee", "Shopowner"]} />
                    </div>
                    <div className="name-input">
                        <div className="inp">
                            <label htmlFor="first-name">First Name: </label>
                            <input type="text" placeholder='Enter First Name' name="first-name" id="first-name" />
                        </div>
                        <div className="inp">
                            <label htmlFor="last-name">Last Name</label>
                            <input type="text" placeholder='Enter Last Name' name="last-name" id="last-name" />
                        </div>
                    </div>
                    <div className="inp">
                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder='Enter Username' name="username" id="username" />
                    </div>
                    <div className="inp">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='Enter Password' name="password" id="password" />
                    </div>
                    <div className="inp">
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder='Enter Email' name="email" id="email" />
                    </div>
                    <div className="inp">
                        <label htmlFor="state">State</label>
                        <input type="text" placeholder='Enter State' name="state" id="state" />
                    </div>
                    <button className="auth-submit btn">
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