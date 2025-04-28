import { useEffect, useState } from "react";
import { ENDPOINTS } from "../constants/endpoints";
import axios from "axios";
import RequestCard from "./RequestCard";

const Requests = () => {

    const [requests, setRequests] = useState([]);
    
    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async() => {
        const response = await axios.get(ENDPOINTS.GET_REQUESTS,
            {
                withCredentials: true
            }
        );
        setRequests(response.data.data);
    }

    if (!requests || requests.length === 0) {
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
                        d="M9 17v-2a2 2 0 00-2-2H5a2 2 0 00-2 2v2m16 0v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2m4-10h.01M4 7h.01M12 7h.01M20 7h.01M4 15h.01M20 15h.01M12 15h.01M12 12h.01M12 9h.01"
                    />
                </svg>
                <p className="text-lg font-medium">No Requests Found</p>
                <p className="text-sm mt-1">You have no pending requests right now.</p>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center">
            {requests.map((request) => (
                <RequestCard
                    key={request.fromUserId._id}
                    user={request.fromUserId}
                    requestId={request._id}
                />
            ))}
        </div>
    );
};

export default Requests;