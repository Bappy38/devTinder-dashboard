import { createContext } from 'react';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../constants/endpoints';

export const SocketContext = createContext(null);

export const createSocketConnection = () => {
    if (location.hostname === 'localhost') {
        return io(API_BASE_URL, {
            autoConnect: true,
            withCredentials: true
        });
    }

    return io(API_BASE_URL, {
        autoConnect: true,
        withCredentials: true,
        path: '/api/socket.io'
    });
}