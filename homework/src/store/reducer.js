import {
    SET_CAN_WRITE, SET_ERROR,
    SET_MESSAGES,
    SET_SHOW_REGISTRATION,
    SET_START,
    SET_USER,
} from './actions';

const initialState = { //это объект, который определяет начальное состояние хранилища. Он содержит следующие свойства:
    messages: [], // массив, который содержит сообщения
    isStarted: false, //этот флаг определяет, начался ли чат
    user: null, //содержит информацию о текущем пользователе
    isCanVote: false, //этот флаг указывает, может ли текущий пользователь участвовать в чате
    isShowRegistration: false, //этот флаг указывает, показывается ли пользователю интерфейс регистрации.
    error: null, //содержит любые ошибки, которые могли возникнуть.
};

const votingReducer = (state = initialState, action) => { //это Redux-редуктор, который управляет состоянием приложения, связанным с голосованием, это функция, которая принимает текущее состояние и выполняет действие, чтобы вернуть новое состояние. Её задача - обрабатывать все изменения состояния, связанные с голосованием.

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
        case SET_CAN_WRITE:
            return  {
              ...state,
              isCanWrite: action.payload
            };
        case SET_START:
            return {
                ...state,
                isCanWrite: true,
                isStarted: action.payload,
            };
        case SET_ERROR:
            return {
                ...state,
                isCanWrite: false,
                error: action.payload
            };
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            };
        default:
            return state;
    }
};

export default votingReducer; //Если тип действия неизвестен, редуктор вернет текущее состояние без изменений. `votingReducer`экспортируется как модуль по умолчанию.