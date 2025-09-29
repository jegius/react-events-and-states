import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/client';

const saved = JSON.parse(localStorage.getItem('appState') || '{}')?.auth;

export const registerUser = createAsyncThunk('auth/register', async ({ login, password }) => {
  const res = await api.register(login, password);
  return { token: res.token, login };
});

export const loginUser = createAsyncThunk('auth/login', async ({ login, password }) => {
  const res = await api.login(login, password);
  return { token: res.token, login };
});

const authSlice = createSlice({
  name: 'auth',
  initialState: saved ?? { token: null, login: null, status: 'idle', error: null },
  reducers: {
    logout(state) { state.token = null; state.login = null; },
  },
  extraReducers: (b) => {
    for (const t of [registerUser, loginUser]) {
      b.addCase(t.pending,   (s)=>{ s.status='loading'; s.error=null; });
      b.addCase(t.fulfilled, (s,a)=>{ s.status='succeeded'; s.token=a.payload.token; s.login=a.payload.login; });
      b.addCase(t.rejected,  (s,a)=>{ s.status='failed'; s.error=a.error.message || 'Error'; });
    }
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
