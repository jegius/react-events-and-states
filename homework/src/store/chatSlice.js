import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        username: null,
        password: null,
        isAuthenticated: false
    },
    messages: [],
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload)
        },
        setMessages: (state, action) => {
            state.messages = action.payload
        },
    }
})

export const {
    setUser,
    addMessage,
    setMessages,
} = chatSlice.actions

export default chatSlice.reducer