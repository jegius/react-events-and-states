import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getChats, sendChatMessage } from "../../services/api";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (token, { rejectWithValue }) => {
    try {
      return await getChats(token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ token, body }, { rejectWithValue }) => {
    try {
      await sendChatMessage(token, body);
      return await getChats(token);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    items: [],
    loading: false,
    sending: false,
    error: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = state.items.length === 0;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Не удалось загрузить сообщения";
      })
      .addCase(sendMessage.pending, (state) => {
        state.sending = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sending = false;
        state.items = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sending = false;
        state.error = action.payload || "Не удалось отправить сообщение";
      });
  },
});

export const { clearMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
