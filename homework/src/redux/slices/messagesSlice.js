// src/redux/slices/messagesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessageToChat: (state, action) => {
        state.messages.push(action.payload)
    },
    setMessages: (state, action) => {
      state.messages = action.payload
    }
  },
});

export const { addMessageToChat, setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;