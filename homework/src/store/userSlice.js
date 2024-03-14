import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload;
    },
    setToken(state, action) {
      state.token = `Bearer ${action.payload}`;
    },
  },
});

export const { setUser, setToken } = userSlice.actions;

export default userSlice.reducer;
