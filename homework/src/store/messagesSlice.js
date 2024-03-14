import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMesages: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setAllMesages(state, action) {
      state.allMesages = action.payload;
    },
  },
});

export const { setAllMesages } = messagesSlice.actions;

export default messagesSlice.reducer;
