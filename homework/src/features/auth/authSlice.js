import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginRequest, registerRequest } from '../../api/api';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (credentials, { rejectWithValue }) => {
    try {
      await registerRequest(credentials);
      return credentials.username;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginRequest(credentials);

      return {
        username: credentials.username,
        token: data.token,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  username: null,
  token: null,
  isAuthenticated: false,
  status: 'idle',
  registerStatus: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.username = null;
      state.token = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.registerStatus = 'idle';
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registerStatus = 'succeeded';
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerStatus = 'failed';
        state.error = action.payload || 'Registration failed';
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;

export default authSlice.reducer;