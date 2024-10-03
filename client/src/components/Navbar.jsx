import unqLogo from '../assets/images/unq_logo.png';
import { Link } from 'react-router-dom';

const Navbar = ({ auth }) => {

    return (
        <nav className='navbar'>
            <div className="unq-logo">
                <img src={unqLogo} alt="" />
                <div className='logo-text'>
                    <div className="logo-name">UnQue</div>
                    <div className="tagline">"Skip the Queue with <br /> UnQue"</div>
                </div>
                <div className="nav-links">
                    {auth == undefined && <>
                        <Link className='nav-link' to="/login">Login</Link>
                        <Link className='nav-link' to="/register">Register</Link>
                        <Link className='nav-link' to="/customer/search-shop">Search Shop</Link>
                    </>}
                    {auth?.role == "customer" && <>
                        <Link className='nav-link' to="/customer/queues">Queues</Link>
                    </>}
                    {auth?.role == "shopowner" && <>
                        <Link className='nav-link' to="/shopowner/shop-owner-dash">Shop Dash</Link>
                    </>}
                    {auth?.role == "employee" && <>
                        <Link className='nav-link' to="/employee/employee-dash">Emp dash</Link>
                    </>}
                    {auth?.role && <Link className='nav-link' to={`/${auth?.role}/profile`}>Profile</Link>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar