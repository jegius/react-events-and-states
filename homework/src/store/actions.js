import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  currentUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      // Авторизация пользователя
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
    logout: (state) => {
      // Выход из учетной записи
      state.isAuthenticated = false;
      state.currentUser = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
