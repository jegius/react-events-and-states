import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [],
    user: {username: null, password: null},
    token: null,
    showRegistration: false,
    formType: 'login',
    error: null,
    footerHeight: 89,
};

const messagerSlice = createSlice({
    name: 'messager',
    initialState,
    reducers: {
        setShowRegistration: (state, action) => {
            state.showRegistration = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.canVote = false;
        },
        addMessage: (state, action) => {
            state.items.push(action.payload);
        },
        setMessages: (state, action) => {
            state.messages = [ ...action.payload];
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setFormType: (state, action) => {
            state.formType = action.payload;
        },
        setFooterHeight: (state, action) => {
            state.footerHeight = action.payload;
        }
    },
});

export const {
    setShowRegistration,
    setUser,
    setError,
    setMessages,
    setToken,
    addMessage,
    setFormType,
    setFooterHeight,
} = messagerSlice.actions;

export default messagerSlice.reducer;