import {
    SET_CAN_VOTE, SET_ERROR,
    SET_ITEMS,
    SET_SHOW_REGISTRATION,
    SET_START,
    SET_USER,
} from './actions';

const initialState = {
    items: [],
    isStarted: false,
    user: null,
    isCanVote: false,
    isShowRegistration: false,
    error: null,
};

const votingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SHOW_REGISTRATION:
            return {
                ...state,
                isShowRegistration: action.payload,
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case SET_CAN_VOTE:
            return  {
              ...state,
              isCanVote: action.payload
            };
        case SET_START:
            return {
                ...state,
                isCanVote: true,
                isStarted: action.payload,
            };
        case SET_ERROR:
            return {
                ...state,
                isCanVote: false,
                error: action.payload
            };
        case SET_ITEMS:
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
    }
};

export default votingReducer;