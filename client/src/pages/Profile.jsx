import React from 'react'
import '../styles/Profile.css'
import profile_img from '../assets/images/profile_img.png'
import { MdModeEdit } from "react-icons/md";
import { MdEditOff } from "react-icons/md";
import shop_img from '../assets/images/shop_img.png'

const InputTag = ({ label, name, type, placeholder, value, classes }) => {
    return (
        <div className="inp">
            <label htmlFor={name}>{label}</label>
            <input type={type} placeholder={placeholder} name={name} value={value} id={name} className={classes} />
        </div>
    )
}

const Profile = () => {
    return (
        <div className='profile'>
            <h1>Customer Profile</h1>
            <div className="profile-container">
                <div className="profile-left">
                    <div className="basic-dets">
                        <div className="profile-img">
                            <img src={profile_img} alt="" />
                        </div>
                        <div className="dets">
                            <p>Ushank Wagh</p>
                            <p className='uname'>@ Ushank04</p>
                        </div>
                    </div>
                </div>
                <div className="profile-right">
                    <div className="profile-dets">
                        <button className='edit-btn'>
                            <MdModeEdit />
                            {/* <MdEditOff /> */}
                        </button>
                        <p className="head">Personal Details</p>
                        <div className="dets-img">
                            <img src={shop_img} alt="" />
                        </div>
                        <div className="group-input">
                            <InputTag label={"First Name"} name={"firstname"} type={"text"} placeholder={"Enter First Name"} value={"Ushannk"} classes={"restrict-edit"} />
                            <InputTag label={"Last Name"} name={"firstname"} type={"text"} placeholder={"Enter Last Name"} value={"Wagh"} classes={"restrict-edit"} />
                        </div>
                        <InputTag label={"Email"} name={"email"} type={"text"} placeholder={"Enter new Email"} value={"email"} classes={"3"} />
                        <InputTag label={"Phone Number"} name={"phoneno"} type={"text"} placeholder={" Enter Phone Number"} value={"phoneno"} classes={"restrict-edit"} />
                        <div className="group-input">
                            <InputTag label={"state"} name={"state"} type={"text"} placeholder={"state"} value={"state"} classes={"restrict-edit"} />
                            <InputTag label={"city"} name={""} type={""} placeholder={""} value={""} classes={"restrict-edit"} />
                            <InputTag label={"area"} name={""} type={""} placeholder={""} value={""} classes={"restrict-edit"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
