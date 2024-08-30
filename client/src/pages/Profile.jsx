import React, { useEffect, useState } from 'react'
import '../styles/Profile.css'
import profile_img from '../assets/images/profile_img.png'
import { MdModeEdit } from "react-icons/md";
import { MdEditOff } from "react-icons/md";
import shop_img from '../assets/images/shop_img.png'
import DropDown from '../components/DropDown';
import axios from "axios"

const InputTag = ({ label, name, type, placeholder, value, classes }) => {
    return (
        <div className="inp">
            <label htmlFor={name}>{label}</label>
            <input type={type} placeholder={placeholder} name={name} value={value} id={name} className={classes} />
        </div>
    )
}

const Profile = () => {

    let username = "Ushank04"

    // let role = "customer"
    // let id = "66b91038976f6aa9f7766492"

    let role = "shopowner"
    let id = "66b911492cc0c1620b918462"

    // let role = "employee"
    // let id = "66b915712cc0c1620b918466"

    const [profileDets, setProfileDets] = useState({});
    const [editable, setEditable] = useState(false);

    useEffect(() => {

        const loadData = async () => {
            const resp = await axios.get(`http://localhost:5000/profile/get-details/${role}/${id}`)

            if (resp.data.success) {
                setProfileDets(resp.data.profileDets);
            }
            else {
                alert(resp.data.message)
            }
        }

        loadData()

    }, [])

    const updateDets = (key, value) => {
        setProfileDets(p => ({ ...p, [key]: value }))
    }

    const handleUpdateProfileDetails = async () => {
        const resp = await axios.get(`http://localhost:5000/profile/update-details/${role}/${id}`)

        if (resp.data.success) {
            alert(resp.data.message)
        }
        else {
            alert(resp.data.message)
        }
    }

    console.log(profileDets);


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
                            <p>{profileDets.firstName} {profileDets.lastName}</p>
                            <p className='uname'>@ {profileDets.firstName}077</p>
                        </div>
                    </div>
                </div>
                <div className="profile-right">
                    <div className="profile-dets">
                        <p className="head">Personal Details</p>
                        <div className='edit-btn' onClick={() => { setEditable(!editable) }}>
                            {
                                editable ? <MdEditOff /> : <MdModeEdit />
                            }
                        </div>



                        {/* common */}

                        <div className="group-input">
                            <div className="inp">
                                <label htmlFor="first-name">First Name: </label>
                                <input type="text" value={profileDets.firstName} onChange={(e) => updateDets("firstName", e.target.value)} placeholder='Enter First Name' className={editable ? "" : "restrict-edit"} disabled={!editable} name="first-name" id="first-name" />
                            </div>
                            <div className="inp">
                                <label htmlFor="last-name">Last Name</label>
                                <input type="text" value={profileDets.lastName} onChange={(e) => updateDets("lastName", e.target.value)} placeholder='Enter Last Name' className={editable ? "" : "restrict-edit"} disabled={!editable} name="last-name" id="last-name" />
                            </div>
                        </div>

                        {/* customer */}
                        {role == "customer" ?
                            <>
                                <div className="inp">
                                    <label htmlFor="phoneNo">PhoneNo</label>
                                    <div className="extra">
                                        <label htmlFor="notifyMe">Notify Me</label>
                                        <input type="checkbox" value={profileDets.phone.notifyMe} onChange={(e) => updateDets("email", e.target.value)} className={editable ? "" : "restrict-edit"} disabled={!editable} name="phoneNo" id="phoneNo" />
                                    </div>
                                    <input type="number" value={profileDets.phone.phoneNo} onChange={(e) => updateDets("phoneNo", e.target.value)} placeholder='Enter PhoneNo' className={editable ? "" : "restrict-edit"} disabled={!editable} name="phoneNo" id="phoneNo" />
                                </div>
                                <div className="inp">
                                    <label htmlFor="email">Email</label>
                                    <div className="extra">
                                        <label htmlFor="notifyMe">Notify Me</label>
                                        <input type="checkbox" value={profileDets.email.notifyMe} onChange={(e) => updateDets("email", e.target.value)} className={editable ? "" : "restrict-edit"} disabled={!editable} name="phoneNo" id="phoneNo" />
                                    </div>
                                    <input type="email" value={profileDets.email.emailId} onChange={(e) => updateDets("email", e.target.value)} placeholder='Enter Email' className={editable ? "" : "restrict-edit"} disabled={!editable} name="email" id="email" />
                                </div>
                            </>
                            :
                            <>
                                <div className="inp">
                                    <label htmlFor="phoneNo">PhoneNo</label>
                                    <input type="number" value={profileDets.phone} onChange={(e) => updateDets("phoneNo", e.target.value)} placeholder='Enter Phone Number' className={editable ? "" : "restrict-edit"} disabled={!editable} name="phoneNo" id="phoneNo" />
                                </div>
                                <div className="inp">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" value={profileDets.email} onChange={(e) => updateDets("email", e.target.value)} placeholder='Enter Email' className={editable ? "" : "restrict-edit"} disabled={!editable} name="email" id="email" />
                                </div>

                            </>
                        }


                        {/* shoponwer */}
                        {role == "shopowner" && <>
                            <div className="inp">
                                <label htmlFor="shop-img">Shop Image</label>
                                <div className="dets-img inp">
                                    <img src={shop_img} alt="" />
                                </div>
                            </div>
                            <div className="inp">
                                <label htmlFor="shop-name">Shop Name</label>
                                <input type="text" value={profileDets.shop?.shopName} onChange={(e) => updateDets("shopName", e.target.value)} placeholder='Enter Shop Name' className={editable ? "" : "restrict-edit"} disabled={!editable} name="shop-name" id="shop-name" />
                            </div>
                        </>
                        }
                        {
                            editable ?
                                <>

                                    <div className="group-input">

                                        <div className="inp">
                                            <DropDown onSelect={(val) => updateDets("state", val)} label="State" values={["Customer", "Employee", "Shopowner"]} />
                                        </div>
                                        <div className="inp">
                                            <DropDown onSelect={(val) => updateDets("city", val)} label="City" values={["Customer", "Employee", "Shopowner"]} />
                                        </div>
                                        <div className="inp">
                                            <DropDown onSelect={(val) => updateDets("area", val)} label="Area" values={["Customer", "Employee", "Shopowner"]} />
                                        </div>
                                    </div>
                                    <button className="btn" onClick={handleUpdateProfileDetails}>
                                        Update
                                    </button>
                                </>
                                :
                                <div className="group-input">
                                    <div className="inp">
                                        <label htmlFor="state">State</label>
                                        <input type="text" value={role == "shopowner" ? profileDets.state : profileDets.shop.state} onChange={() => { }} className="restrict-edit" disabled={!editable} name="state" id="state" />
                                    </div>
                                    <div className="inp">
                                        <label htmlFor="city">City</label>
                                        <input type="text" value={role == "shopowner" ? profileDets.city : profileDets.shop.city} onChange={() => { }} className="restrict-edit" disabled={!editable} name="city" id="city" />
                                    </div>
                                    <div className="inp">
                                        <label htmlFor="area">Area</label>
                                        <input type="text" value={role == "shopowner" ? profileDets.area : profileDets.shop.area} onChange={() => { }} className="restrict-edit" disabled={!editable} name="area" id="area" />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile



{/* <div className="group-input">
    <InputTag label={"First Name"} name={"firstName"} type={"text"} placeholder={"Enter First Name"} value={"Ushannk"} classes={"restrict-edit"} />
    <InputTag label={"Last Name"} name={"firstName"} type={"text"} placeholder={"Enter Last Name"} value={"Wagh"} classes={"restrict-edit"} />
    </div>
    <InputTag label={"Email"} name={"email"} type={"text"} placeholder={"Enter new Email"} value={"email"} classes={"3"} />
    <InputTag label={"Phone Number"} name={"phoneNo"} type={"text"} placeholder={" Enter Phone Number"} value={"phoneno"} classes={"restrict-edit"} />
    <div className="group-input">
    <InputTag label={"state"} name={"state"} type={"text"} placeholder={"state"} value={"state"} classes={"restrict-edit"} />
    <InputTag label={"city"} name={""} type={""} placeholder={""} value={""} classes={"restrict-edit"} />
    <InputTag label={"area"} name={""} type={""} placeholder={""} value={""} classes={"restrict-edit"} />
</div> */}