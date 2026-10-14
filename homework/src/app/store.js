import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import messagesReducer from "../features/messages/messagesSlice";

const STORAGE_KEY = "global-chat-state";

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return undefined;

    const parsed = JSON.parse(saved);

    return {
      auth: {
        user: parsed.auth?.user ?? null,
        token: parsed.auth?.token ?? null,
        isAuthenticated: Boolean(parsed.auth?.token),
        loading: false,
        error: null,
      },
      messages: {
        items: Array.isArray(parsed.messages?.items)
          ? parsed.messages.items
          : [],
        loading: false,
        sending: false,
        error: null,
      },
    };
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messagesReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  const state = store.getState();

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        auth: {
          user: state.auth.user,
          token: state.auth.token,
        },
        messages: {
          items: state.messages.items,
        },
      }),
    );
  } catch (error) {
    console.error("Не удалось сохранить состояние:", error);
  }
});
