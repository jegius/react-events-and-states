import { configureStore } from '@reduxjs/toolkit';
import votingReducer from './votingSlice';

const store = configureStore({
    reducer: votingReducer,
});

export default store;