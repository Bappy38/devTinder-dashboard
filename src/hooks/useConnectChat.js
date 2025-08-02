import { useEffect, useState, useRef } from "react"
import { createSocketConnection } from "../helpers/socket"
import { EVENTS } from "../constants/events";
import { NOTIFICATION_TYPE } from "../constants/notificationType";
import { useNavigate } from "react-router-dom";

const useConnectChat = (roomId) => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        socketRef.current = createSocketConnection();
        const socket = socketRef.current;

        if (!socket.connected) {
            socket.connect();
        }

        socket.emit(EVENTS.JOIN_ROOM, { roomId }, (response) => {
            if (response.unAuthorized) {
                window.showNotification(crypto.randomUUID(), "You do not have access to this room", NOTIFICATION_TYPE.ERROR);
                navigate('/');
            }
        });

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
            socketRef.current.emit(EVENTS.SEND_MESSAGE, { roomId, text }, (response) => {
                if (response.error) {
                    window.showNotification(crypto.randomUUID(), response.error, NOTIFICATION_TYPE.ERROR);
                }
            });
        }
    }

    return {
        messages,
        sendMessage
    };
}

export default useConnectChat;