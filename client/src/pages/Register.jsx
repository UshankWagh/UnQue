import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <div className='auth register'>
            <div className="auth-container">
                <h1>Register</h1>
                <div className="auth-form">
                    <div className="inp">
                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder='Enter Username' name="username" id="username" />
                    </div>
                    <div className="inp">
                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder='Enter Username' name="username" id="username" />
                    </div>
                    <div className="inp">
                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder='Enter Username' name="username" id="username" />
                    </div>
                    <div className="inp">
                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder='Enter Username' name="username" id="username" />
                    </div>
                    <div className="inp">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='Enter Password' name="password" id="password" />
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