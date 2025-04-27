export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ENDPOINTS = {
    LOGIN: API_BASE_URL + '/auth/signin',
    SIGNUP: API_BASE_URL + '/auth/signup',
    LOGOUT: API_BASE_URL + '/auth/logout',
    
    GET_PROFILE: API_BASE_URL + '/profile/view',
    UPDATE_PROFILE: API_BASE_URL + '/profile/edit',

    GET_FEED: API_BASE_URL + '/user/feed',
};