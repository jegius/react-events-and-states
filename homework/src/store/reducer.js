import { combineReducers } from 'redux';
import authReducer from './actions';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;