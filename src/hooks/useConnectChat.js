import { useEffect, useState } from "react"
import { socket } from "../helpers/socket"
import { EVENTS } from "../constants/events";


const useConnectChat = (roomId) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {

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
        socket.emit(EVENTS.SEND_MESSAGE, { roomId, text });
    }

    return {
        messages,
        sendMessage
    };
}

export default useConnectChat;