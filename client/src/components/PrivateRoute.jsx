import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loader from "./Loader";

export default function PrivateRoute({ role }) {
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")));

    return auth?.role == role ? <Outlet /> : <Loader msg={"User not authorized"} />
}