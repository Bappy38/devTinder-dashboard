import { useEffect, useState, useRef } from "react"
import { createSocketConnection } from "../helpers/socket"
import { EVENTS } from "../constants/events";


const useConnectChat = (roomId) => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = createSocketConnection();
        const socket = socketRef.current;

        if (!socket.connected) {
            socket.connect();
        }

        socket.emit(EVENTS.JOIN_ROOM, roomId);

        socket.on(EVENTS.RECEIVE_MESSAGE, (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off(EVENTS.RECEIVE_MESSAGE);
            socket.disconnect();
        }
    }, [roomId]);

    const sendMessage = (text) => {
        if (socketRef.current) {
            socketRef.current.emit(EVENTS.SEND_MESSAGE, { roomId, text });
        }
    }

    return {
        messages,
        sendMessage
    };
}

export default useConnectChat;