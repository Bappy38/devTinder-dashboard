import { createContext } from 'react';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../constants/endpoints';

export const SocketContext = createContext(null);

export const socket = io(API_BASE_URL, {
    autoConnect: true
});