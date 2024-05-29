import { configureStore } from "@reduxjs/toolkit";
import {  userReducer } from "./reducer/userReducer";
import {  profileReducer } from "./reducer/profileReducer";
import { courseReducer } from "./reducer/courseReducer";
import { subscriptionReducer } from "./reducer/subscriptionReducer";
import { adminReducer } from "./reducer/adminReducer";
import { otherReducer } from "./reducer/otherReducer";

export const server = "https://coursebundler-server-eta.vercel.app/api/v1"
// export const server = "https://coursebundler-server-it0y.onrender.com/api/v1"

const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        course: courseReducer,
        subscription: subscriptionReducer,
        admin: adminReducer,
        other: otherReducer
    }
});

export default store;