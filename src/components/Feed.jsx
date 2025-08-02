import devTinderAPI from "../interceptors/errorHandlingInterceptor";
import { useEffect } from "react";
import { ENDPOINTS } from "../constants/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {

    const users = useSelector((state) => state.feed);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchFeed();
    }, []);

    const fetchFeed = async () => {
        try {
            const response = await devTinderAPI.get(ENDPOINTS.GET_FEED, {
                withCredentials: true
            });
            dispatch(addFeed(response.data.data));
        } catch (err) {
            console.error(err);
        }
    }

    if (!users || users.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center mt-20 text-gray-500">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mb-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 16h8m-4-8v8m0 0v2m0-2H8m8 0h-4"
                    />
                </svg>
                <p className="text-lg font-medium">No New Feeds</p>
                <p className="text-sm mt-1">Come back later to see more people!</p>
            </div>
        );
    }

    return (
        <div className="mt-4 flex justify-center">
            <UserCard
                user={users[0]}
            />
        </div>
    );
};

export default Feed;