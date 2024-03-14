import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import userSlice from "./userSlice";
import messagesSlice from "./messagesSlice";
import globalChatSlice from "./globalChatSlice";

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

const store = configureStore({
  reducer: {
    user: userSlice,
    messages: messagesSlice,
    globalChat: globalChatSlice,
  },
  devTools: composeWithDevTools,
  preloadedState: persistedState,
});

store.subscribe(() => {
  if (!store.getState().messages.allMesages) return;
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default store;
