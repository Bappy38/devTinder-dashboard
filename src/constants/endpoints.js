export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ENDPOINTS = {
    LOGIN: API_BASE_URL + '/auth/signin',
    SIGNUP: API_BASE_URL + '/auth/signup',
    LOGOUT: API_BASE_URL + '/auth/logout',
    
    GET_PROFILE: API_BASE_URL + '/profile/view',
    UPDATE_PROFILE: API_BASE_URL + '/profile/edit',

    GET_FEED: API_BASE_URL + '/user/feed',
    GET_CONNECTIONS: API_BASE_URL + '/user/connection',
    GET_CONNECTION: (ConnectionId) => `${API_BASE_URL}/user/connection/${ConnectionId}`,
    GET_REQUESTS: API_BASE_URL + '/user/request/received',

    SEND_REQUEST: (Status, ToUserId) => `${API_BASE_URL}/request/send/${Status}/${ToUserId}`,
    REVIEW_REQUEST: (Status, RequestId) => `${API_BASE_URL}/request/review/${Status}/${RequestId}`,
    GET_MESSAGES: (roomId, limit = 5, cursor = null) => `${API_BASE_URL}/message/${roomId}?limit=${limit}${cursor ? `&cursor=${cursor}` : ''}`
};