import { useEffect, useRef } from "react";
import { createSocketConnection } from "../helpers/socket";
import { EVENTS } from "../constants/events";
import { HEARTBEAT_INTERVAL_MS } from "../constants/constants";
import { useSelector } from "react-redux";

const useHeartbeat = () => {
    const socketRef = useRef();
    const user = useSelector((state) => state.user);

    useEffect(() => {

        if (!user) return;

        socketRef.current = createSocketConnection();
        const socket = socketRef.current;

        if (!socket.connected) {
            socket.connect();
        }

        const heartbeat = setInterval(() => {
            socket.emit(EVENTS.HEARTBEAT);
        }, HEARTBEAT_INTERVAL_MS);

        return () => {
            clearInterval(heartbeat);
            socket.disconnect();
        };
    }, [user]);
};

export default useHeartbeat;