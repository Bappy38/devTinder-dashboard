import axios from "axios";
import { API_BASE_URL } from "../constants/endpoints";
import { NOTIFICATION_TYPE } from "../constants/notificationType";

const devTinderAPI = axios.create({
    baseURL: API_BASE_URL
});

devTinderAPI.interceptors.response.use(
    (response) => response,
    (error) => {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred.";
      
      if (typeof window !== "undefined" && window.showNotification) {
        window.showNotification(crypto.randomUUID(), errorMessage, NOTIFICATION_TYPE.ERROR);
      }
  
      return Promise.reject(error);
    }
  );

export default devTinderAPI;