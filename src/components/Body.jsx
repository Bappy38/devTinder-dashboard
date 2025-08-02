import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import { useEffect } from "react";
import devTinderAPI from "../interceptors/errorHandlingInterceptor";
import { ENDPOINTS } from "../constants/endpoints";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import useHeartbeat from "../hooks/useHeartbeat";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useHeartbeat();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await devTinderAPI.get(ENDPOINTS.GET_PROFILE,
                {
                    withCredentials: true
                }
            );
            dispatch(addUser(response.data.data));
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