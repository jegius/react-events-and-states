import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats(state, action) {
      state.chats = action.payload;
    },
    addChat(state, action) {
      state.chats.push(action.payload);
    },
  },
});

export const { setChats, addChat } = chatSlice.actions;
export default chatSlice.reducer;
