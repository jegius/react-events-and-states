export const ADD_ITEM = 'ADD_ITEM';
export const SET_START = 'SET_START';
export const SET_ERROR = 'SET_ERROR';
export const SET_ITEMS = 'SET_ITEMS';
export const SET_USER = 'SET_USER';
export const SET_CAN_VOTE = 'SET_CAN_VOTE';
export const SET_SHOW_REGISTRATION = 'SET_SHOW_REGISTRATION';

export const setShowRegistration = isNeedToShow => ({
    type: SET_SHOW_REGISTRATION,
    payload: isNeedToShow
});

export const setCanVote = isCanVote => ({
    type: SET_CAN_VOTE,
    payload: isCanVote
});

export const setUser = userName => ({
    type: SET_USER,
    payload: userName
});

export const setError = error => ({
    type: SET_ERROR,
    payload: error
});

export const setItems = items => ({
    type: SET_ITEMS,
    payload: items
});

export const setStart = isStarted => ({
    type: SET_START,
    payload: isStarted
})
