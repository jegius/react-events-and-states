import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/client';

const saved = JSON.parse(localStorage.getItem('appState') || '{}')?.chat;

const fromString = (s) => {
  const i = typeof s === 'string' ? s.indexOf(':') : -1;
  if (i > -1) return { user: s.slice(0, i).trim(), message: s.slice(i + 1).trim() };
  return { user: 'user', message: String(s) };
};

const pickName = (o) => (o?.login || o?.name || o?.username || o?.userName || o?.nick || o?.id || null);

const getName = (m) =>
  (typeof m?.user === 'string' && m.user) ||
  (typeof m?.user === 'object' && pickName(m.user)) ||
  m?.login || m?.author || pickName(m?.author) ||
  m?.sender || pickName(m?.sender) ||
  m?.owner  || pickName(m?.owner)  ||
  m?.name   || 'user';

const getText = (m) =>
  (typeof m?.body === 'string' && m.body) ||
  m?.body?.text ||
  m?.message || m?.text || m?.content || '';

const normalize = (arr = []) =>
  arr.map((m) => (typeof m === 'string' ? fromString(m) : { user: getName(m), message: getText(m) }));

export const fetchChats = createAsyncThunk('chat/fetch', async (_, { getState }) => {
  const token = getState().auth.token;
  const res = await api.getChats(token);
  return normalize(Array.isArray(res) ? res : []);
});

export const sendMessage = createAsyncThunk('chat/send', async (message, { getState }) => {
  const token = getState().auth.token;
  const login = getState().auth.login;
  await api.sendMsg(token, message);
  return { message, user: login, date: Date.now() };
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: saved ?? { messages: [], status: 'idle', error: null },
  reducers: {
    resetChat: (s) => { s.messages = []; s.status = 'idle'; s.error = null; },
  },
  extraReducers: (b) => {
    b.addCase(fetchChats.pending,   (s)=>{ s.status='loading'; });
    b.addCase(fetchChats.fulfilled, (s,a)=>{ s.status='succeeded'; s.messages = a.payload; });
    b.addCase(fetchChats.rejected,  (s,a)=>{ s.status='failed'; s.error=a.error.message; });
    b.addCase(sendMessage.fulfilled,(s,a)=>{ s.messages.push({ user:a.payload.user, message:a.payload.message }); });
  }
});

export const { resetChat } = chatSlice.actions;
export default chatSlice.reducer;
