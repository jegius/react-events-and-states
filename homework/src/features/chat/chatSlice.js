import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getChats, sendMessage } from '../../api/chatApi';

const initialState = {
  messages: [],
  status: 'idle',
  error: null,
};

export const fetchChats = createAsyncThunk(
  'chat/fetchChats',
  async (token, { rejectWithValue }) => {
    try {
      const response = await getChats(token);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const postMessage = createAsyncThunk(
  'chat/postMessage',
  async ({ message, token }, { rejectWithValue }) => {
    try {
      const response = await sendMessage(message, token);
      return {
        username: response.username,
        body: message,
        createdAt: new Date().toISOString()
      };
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload || [];
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(postMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export default chatSlice.reducer;

export const selectAllMessages = (state) => state.chat.messages;
export const selectChatStatus = (state) => state.chat.status;