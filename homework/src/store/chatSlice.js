import { createSlice } from '@reduxjs/toolkit';

const loadMessagesFromLocalStorage = () => {
  const savedMessages = localStorage.getItem('messages');
  return savedMessages ? JSON.parse(savedMessages) : [];
};

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: loadMessagesFromLocalStorage(),
    error: null,
  },
  reducers: {
    setMessages(state, action) {
      if (JSON.stringify(state.messages) !== JSON.stringify(action.payload)) {
        state.messages = action.payload;
        localStorage.setItem('messages', JSON.stringify(state.messages));
      }
    },
    addMessage(state, action) {
      const exists = state.messages.some(message => message.id === action.payload.id);
      if (!exists) {
        state.messages.push(action.payload);
        localStorage.setItem('messages', JSON.stringify(state.messages));
      }
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setMessages, addMessage, setError } = chatSlice.actions;
export default chatSlice.reducer;