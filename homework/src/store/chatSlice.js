import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    }
})

export const {
    setUser
} = chatSlice.actions

export default chatSlice.reducer