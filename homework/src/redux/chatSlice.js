import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const fetchMessages = createAsyncThunk('chat/fetchMessages', async (_, { getState, rejectWithValue }) => {
  try {
    const { token } = getState().auth;
    const response = await axios.get(`${API_URL}/chats`, {
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Не удалось загрузить сообщения');
  }
});

export const sendMessage = createAsyncThunk('chat/sendMessage', async (text, { getState, rejectWithValue }) => {
  try {
    const { token, user } = getState().auth;
    await axios.post(`${API_URL}/chats`, { body: text }, {
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    });
    return { username: user?.username || 'Вы', body: text };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Не удалось отправить сообщение');
  }
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => { 
        state.status = 'loading'; 
        state.error = null; 
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload;
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export default chatSlice.reducer;
