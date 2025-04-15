import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import { useEffect } from "react";
import axios from "axios";
import { ENDPOINTS } from "../constants/endpoints";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const Body = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get(ENDPOINTS.GET_PROFILE,
                {
                    withCredentials: true
                }
            );
            dispatch(addUser(response.data));
        } catch (err) {
            console.error(err);
            if (err.status === 401) {
                navigate("/login");
            }
        }
    };

    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};

export default Body;