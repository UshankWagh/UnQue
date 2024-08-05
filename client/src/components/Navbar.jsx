import React from 'react'
import unqLogo from '../assets/unq_logo.png';
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
                <Link to="/shop">Shop</Link>
                <Link to="/queues">Queues</Link>
            </div>
        </nav>
    )
}

export default Navbar