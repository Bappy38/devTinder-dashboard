import axios from "axios"
import { ENDPOINTS } from "../constants/endpoints"
import { useEffect, useState } from "react"
import { HEARTBEAT_INTERVAL_MS } from "../constants/constants";

const useConnectionUser = (connectionId) => {
    const [ connection, setConnection ] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {

            try {
                const response = await axios.get(ENDPOINTS.GET_CONNECTION(connectionId), {
                    withCredentials: true
                });
                setConnection(response.data.data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchUser();
        
        const fetchUserPoll = setInterval(fetchUser, 2 * HEARTBEAT_INTERVAL_MS);
        return () => {
            clearInterval(fetchUserPoll);
        }
    }, [connectionId]);

    return connection?.user;
}

export default useConnectionUser;