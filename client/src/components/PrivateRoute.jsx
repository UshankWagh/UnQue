import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loader from "./Loader.jsx";

export default function PrivateRoute({ role }) {
    const [auth, setAuth] = useState(localStorage.getItem("auth") != "undefined" ? JSON.parse(localStorage.getItem("auth")) : "");

    return auth?.role == role ? <Outlet /> : <Loader title="Access Denied!!" msg={`You need to login as "${role.toUpperCase()}" to access this page`} redirectURL="/login" redirectText="Sign In?" />
}