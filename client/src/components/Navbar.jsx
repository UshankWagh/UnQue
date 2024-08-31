import React from 'react'
import unqLogo from '../assets/images/unq_logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className="unq-logo">
                <img src={unqLogo} alt="" />
                <div className='logo-text'>
                    <div className="logo-name">UnQue</div>
                    <div className="tagline">"Skip the Queue with <br /> UnQue"</div>
                </div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/search-shop">Search Shop</Link>
                <Link to="/shop?shopid=66b911492cc0c1620b918462">Shop</Link>
                <Link to="/queues">Queues</Link>
                <Link to="/employee-dash">Emp dash</Link>
                <Link to="/counter">Counters</Link>
                <Link to="/shop-owner-dash">Shop Dash</Link>
                <Link to="/profile">Profile</Link>
            </div>
        </nav>
    )
}

export default Navbar