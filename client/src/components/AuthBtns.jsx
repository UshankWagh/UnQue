import React, { useEffect, useState } from 'react';
import { SlLogin } from "react-icons/sl";
import { IoMdPower } from "react-icons/io";
import { SlNote } from "react-icons/sl";
import { useNavigate, Link } from 'react-router-dom'

const AuthBtns = () => {
    const [auth, setAuth] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        setAuth(localStorage.getItem("auth") != "undefined" ? JSON.parse(localStorage.getItem("auth")) : "");
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("auth");
        setAuth(undefined);
        navigate("/login");
    }
    return (
        <div className="auth-btns">
            {auth ?
                <>
                    <div onClick={handleLogout} className="sign-in-btn auth-btn">
                        <IoMdPower />
                        <span className="auth-text">Sign Out</span>
                    </div>
                    <Link to={`/${auth.role}/profile`} className="profile-logo">{auth.name[0]}</Link>
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