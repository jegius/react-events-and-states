import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    isStarted: false,
    user: null,
    canVote: false,
    showRegistration: false,
    error: null,
};

const votingSlice = createSlice({
    name: 'voting',
    initialState,
    reducers: {
        setShowRegistration: (state, action) => {
            state.showRegistration = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setCanVote: (state, action) => {
            state.canVote = action.payload;
        },
        setStart: (state, action) => {
            state.isStarted = action.payload;
            state.canVote = true;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.canVote = false;
        },
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        setItems: (state, action) => {
            state.items = action.payload;
        },
    },
});

export const {
    setShowRegistration,
    setUser,
    setCanVote,
    setStart,
    setError,
    setItems,
} = votingSlice.actions;

export default votingSlice.reducer;