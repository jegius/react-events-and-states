import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001'; 

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username: credentials.username,
      password: credentials.password
    });
    return { token: response.data.token, username: credentials.username };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Ошибка входа');
  }
});

export const registerUser = createAsyncThunk('auth/register', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username: credentials.username,
      password: credentials.password
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Ошибка регистрации');
  }
});

const cachedToken = localStorage.getItem('token');
const cachedUsername = localStorage.getItem('username');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: cachedUsername ? { username: cachedUsername } : null,
    token: cachedToken,
    status: 'idle',
    error: null,
    registerSuccess: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.registerSuccess = false;
      localStorage.clear();
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = { username: action.payload.username };
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('username', action.payload.username);
      })
      .addCase(loginUser.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })
      
      .addCase(registerUser.pending, (state) => { state.status = 'loading'; state.error = null; state.registerSuccess = false; })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.registerSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
