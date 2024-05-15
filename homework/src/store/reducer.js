import {
    ADD_MESSAGE,
    SET_MESSAGES
} from './actions';

const initialState = {
    messages: [],
  };
  
const chatReducer = (state = initialState, action) => { // это функция, которая принимает текущее состояние и выполняет действие, чтобы вернуть новое состояние. Её задача - обрабатывать все изменения состояния, связанные с чатами. 
    switch (action.type) {
        case ADD_MESSAGE:
        return {
            ...state,
            messages: [...state.messages, action.payload],
        };

        case SET_MESSAGES:
        return {
            ...state,
            messages: action.payload,
        };

        default: // В зависимости от `action.type`, `votingReducer` изменяет различные аспекты состояния. Если тип действия неизвестен, редуктор вернет текущее состояние без изменений.

        return state;
    }
};

export default chatReducer; // экспортируется как модуль по умолчанию.