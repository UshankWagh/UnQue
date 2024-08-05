import React from 'react'
import unqLogo from '../assets/images/unq_logo.png';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className="unq-logo">
                <img src={unqLogo} alt="" />
                <div className='logo-text'>
                    <div className="logo-name">UnQue</div>
                    <div className="tagline">"Skip the Queue with <br /> UnQue"</div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar