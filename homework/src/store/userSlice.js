import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: null,
    token: null,
    error: null,
  },
  reducers: {
    setUser (state, action) {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.error = null;
    },
    clearUser (state) {
      state.username = null;
      state.token = null;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setUser , clearUser , setError } = userSlice.actions;
export default userSlice.reducer;