import devTinderAPI from "../interceptors/errorHandlingInterceptor";
import { useEffect, useState } from "react";
import { ENDPOINTS } from "../constants/endpoints";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {

    const [connections, setConnections] = useState([]);

    useEffect(() => {
        fetchConnections();
    }, []);

    const fetchConnections = async() => {
        const response = await devTinderAPI.get(ENDPOINTS.GET_CONNECTIONS,
            {
                withCredentials: true
            }
        );
        setConnections(response.data.data);
    }

    if (!connections || connections.length === 0) {
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
                        d="M17 20h5v-2a4 4 0 00-3-3.87M9 20h6M4 20h5m8-10a4 4 0 01-8 0 4 4 0 018 0z"
                    />
                </svg>
                <p className="text-lg font-medium">No Connections Yet</p>
                <p className="text-sm mt-1">Start connecting with people to see them here.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center">
            {connections.map((connection) => (
                <ConnectionCard key={connection._id} connection={connection} />
            ))}
        </div>
    )
}

export default Connections;