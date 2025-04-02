import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import chatReducer from "./slices/chatSlice";
import messagesReducer from "./slices/messagesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    messages: messagesReducer,
  },
});

export default store;
