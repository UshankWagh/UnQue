import unqLogo from '../assets/images/unq_logo.png';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaShop } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { SlLogin } from "react-icons/sl";
// import { BiLogIn } from "react-icons/bi";
import { SlNote } from "react-icons/sl";

const Navbar = ({ auth }) => {

    return (
        <nav className='navbar'>
            <div className="unq-logo">
                <img src={unqLogo} alt="" />
                <div className='logo-text'>
                    <div className="logo-name">EffiQ</div>
                    <div className="tagline">"Skip the Queue with <br /> EffiQ"</div>
                </div>
                <div className="nav-links">
                    {auth == undefined && <>
                        <Link className='nav-link' to="/login"><SlLogin /><span>Login</span></Link>
                        <Link className='nav-link' to="/register"><SlNote /><span>Register</span></Link>
                        <Link className='nav-link' to="/search-shop"><FaSearch /><span>Search Shop</span></Link>
                    </>}
                    {auth?.role == "customer" && <>
                        <Link className='nav-link' to="/search-shop"><FaSearch /><span>Search Shop</span></Link>
                        <Link className='nav-link' to="/customer/queues"><FaPeopleGroup /><span>Queues</span></Link>
                    </>}
                    {auth?.role == "shopowner" && <>
                        <Link className='nav-link' to="/shopowner/shop-owner-dash"><FaShop /><span>Shop Dash</span></Link>
                    </>}
                    {auth?.role == "employee" && <>
                        <Link className='nav-link' to="/employee/employee-dash"><AiFillDashboard /><span>Emp dash</span></Link>
                    </>}
                    {auth?.role && <Link className='nav-link' to={`/${auth?.role}/profile`}><FaUser /><span>Profile</span></Link>}
                </div>
            </div>
        </nav >
    )
}

export default Navbar