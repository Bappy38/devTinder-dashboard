import axios from "axios";
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
            const response = await axios.get(ENDPOINTS.GET_FEED, {
                withCredentials: true
            });
            dispatch(addFeed(response.data.data));
        } catch (err) {
            console.error(err);
        }
    }

    if (!users) {
        return <></>
    }

    return (
        <div className="mt-4 flex justify-center">
            <UserCard
                user={users[0]}
            />
        </div>
        
        // <div>
        //     {
        //         users.map(user => (
        //             <UserCard
        //                 key={user._id}
        //                 user={user}
        //             />
        //         ))
        //     }
        // </div>
    );
};

export default Feed;