import React, { useEffect, useState } from 'react';
import { SlLogin } from "react-icons/sl";
import { IoMdPower } from "react-icons/io";
import { SlNote } from "react-icons/sl";
import { Link, useNavigate } from 'react-router-dom'

const AuthBtns = ({ auth, handleLogout }) => {
    const navigate = useNavigate();

    const logoutUser = () => {
        handleLogout();
        navigate("/login");
    }
    return (
        <div className="auth-btns">
            {auth ?
                <>
                    <div onClick={logoutUser} className="sign-in-btn auth-btn">
                        <IoMdPower />
                        <span className="auth-text">Sign Out</span>
                    </div>
                    <Link to={`/${{ ...auth }.role}/profile`} className="profile-logo">{{ ...auth }.name.split(" ")[0][0].toUpperCase() + { ...auth }.name.split(" ")[1][0].toUpperCase()}</Link>
                    {/* <Link to={`/${auth.role}/profile`} className="profile-logo">J</Link> */}
                </>
                : <>
                    <Link to="/login" className="sign-up-btn auth-btn">
                        <SlLogin />
                        <span className="auth-text">Sign In</span>
                    </Link>
                    <Link to="/register" className="sign-out-btn auth-btn">
                        <SlNote />
                        <span className="auth-text">Sign Up</span>
                    </Link>
                </>
            }
        </div>
    )
}

export default AuthBtns