import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatStatus: "none",
};

const globalChatSlice = createSlice({
  name: "globalChat",
  initialState,
  reducers: {
    setChatStatus(state, action) {
      state.chatStatus = action.payload;
    },
  },
});

export const { setChatStatus } = globalChatSlice.actions;

export default globalChatSlice.reducer;
