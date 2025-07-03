import axios from "axios"
import { ENDPOINTS } from "../constants/endpoints"
import { useEffect, useState } from "react"


const useUser = (userId) => {

    const [ user, setUser ] = useState(null);

    useEffect(() => {

        const fetchUser = async () => {

            try {
                const response = await axios.get(ENDPOINTS.GET_USER(userId), {
                    withCredentials: true
                });
                setUser(response.data.data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchUser();
    }, [userId]);

    return user;
}

export default useUser;