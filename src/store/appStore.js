import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/userSlice";
import feedReducer from "../store/feedSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer
    }
});

export default appStore;