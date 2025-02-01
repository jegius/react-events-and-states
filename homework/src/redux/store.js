// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import chatReducer from './slices/chatSlice';
import messagesReducer from './slices/messagesSlice';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('appState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('appState', serializedState);
    } catch (err) {
        console.error('Error saving state:', err);
    }
};

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    messages: messagesReducer,
  },
    preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});


export default store;