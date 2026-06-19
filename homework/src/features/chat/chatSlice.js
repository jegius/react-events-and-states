import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getChatsRequest, sendChatRequest } from '../../api/api';

function normalizeMessages(messages) {
  return messages.map((message, index) => ({
    id: `${index}-${message.username}-${message.body}`,
    username: message.username,
    body: message.body,
  }));
}

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      if (!token) {
        throw new Error('Token is missing');
      }

      const messages = await getChatsRequest(token);

      return normalizeMessages(messages);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (body, { getState, dispatch, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      if (!token) {
        throw new Error('Token is missing');
      }

      await sendChatRequest(body, token);
      await dispatch(fetchMessages()).unwrap();

      return body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  messages: [],
  status: 'idle',
  sendStatus: 'idle',
  error: null,
  lastLoadedAt: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    clearChat(state) {
      state.messages = [];
      state.status = 'idle';
      state.sendStatus = 'idle';
      state.error = null;
      state.lastLoadedAt = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload;
        state.lastLoadedAt = Date.now();
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to load messages';
      })
      .addCase(sendMessage.pending, (state) => {
        state.sendStatus = 'loading';
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.sendStatus = 'succeeded';
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sendStatus = 'failed';
        state.error = action.payload || 'Failed to send message';
      });
  },
});

export const { clearChat } = chatSlice.actions;

export default chatSlice.reducer;