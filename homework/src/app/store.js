import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import chatReducer from '../features/chat/chatSlice';

const STORAGE_KEY = 'global-chat-state';

function loadState() {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);

    if (!serializedState) {
      return undefined;
    }

    const savedState = JSON.parse(serializedState);

    return {
      auth: {
        username: savedState.auth?.username || null,
        token: savedState.auth?.token || null,
        isAuthenticated: Boolean(savedState.auth?.token),
        status: 'idle',
        registerStatus: 'idle',
        error: null,
      },
      chat: {
        messages: Array.isArray(savedState.chat?.messages)
          ? savedState.chat.messages
          : [],
        status: 'idle',
        sendStatus: 'idle',
        error: null,
        lastLoadedAt: savedState.chat?.lastLoadedAt || null,
      },
    };
  } catch {
    return undefined;
  }
}

function saveState(state) {
  try {
    const stateToSave = {
      auth: {
        username: state.auth.username,
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated,
      },
      chat: {
        messages: state.chat.messages,
        lastLoadedAt: state.chat.lastLoadedAt,
      },
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  } catch {
    // localStorage может быть недоступен, например в private mode
  }
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});