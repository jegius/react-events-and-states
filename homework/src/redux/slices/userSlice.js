import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    username: null,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    logout(state) {
      state.token = null;
      state.username = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
