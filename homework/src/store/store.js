import { configureStore } from '@reduxjs/toolkit';
import messagerReducer from './reducer';

const store = configureStore({
    reducer: messagerReducer
});

export default store;