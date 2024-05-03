import { createStore } from 'redux';
import votingReducer from './reducer';

const store = createStore(votingReducer);

export default store;