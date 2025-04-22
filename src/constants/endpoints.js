export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ENDPOINTS = {
    LOGIN: API_BASE_URL + '/auth/signin',
    LOGOUT: API_BASE_URL + '/auth/logout',
    
    GET_PROFILE: API_BASE_URL + '/profile/view',

    GET_FEED: API_BASE_URL + '/user/feed',
};