import { configureStore } from '@reduxjs/toolkit';
import auth from '../features/auth/authSlice';
import chat from '../features/chat/chatSlice';

function loadState() {
  try { return JSON.parse(localStorage.getItem('appState')) || undefined; }
  catch { return undefined; }
}
function saveState(state) {
  try {
    if (state?.auth?.token) {
      localStorage.setItem('appState', JSON.stringify({ auth: state.auth, chat: state.chat }));
    } else {
      localStorage.removeItem('appState');
    }
  } catch {}
}

const store = configureStore({
  reducer: { auth, chat },
  preloadedState: loadState(),
});

store.subscribe(()=> saveState(store.getState()));

export default store;
