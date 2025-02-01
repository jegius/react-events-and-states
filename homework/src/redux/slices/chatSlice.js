// src/redux/slices/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chats: []
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
      // Тут могут быть редьюсеры для работы с чатами
  },
});
export default chatSlice.reducer;