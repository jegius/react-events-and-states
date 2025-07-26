import { configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from '../utils/localStorage';
import authReducer from '../features/auth/authSlice';
import chatReducer from '../features/chat/chatSlice';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;