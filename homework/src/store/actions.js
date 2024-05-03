export const ADD_MESSAGE = 'ADD_MESSAGE'; //Тип действия для добавления сообщения
export const SET_START = 'SET_START'; //Тип действия для установки значения, указывающего, начат ли чат
export const SET_ERROR = 'SET_ERROR'; // Тип действия для установки сообщения об ошибке.
export const SET_MESSAGES = 'SET_MESSAGE'; // Тип действия для установки списка сообщений
export const SET_USER = 'SET_USER'; // Тип действия для установки текущего пользователя.
export const SET_CAN_WRITE = 'SET_CAN_WRITE'; // Тип действия для указания возможности написать в чате
export const SET_SHOW_REGISTRATION = 'SET_SHOW_REGISTRATION'; //Тип действия для указания отображается ли регистрация

export const setShowRegistration = isNeedToShow => ({
    type: SET_SHOW_REGISTRATION,
    payload: isNeedToShow
});

export const setCanWrite = isCanWrite => ({
    type: SET_CAN_WRITE,
    payload: isCanWrite
});

export const setUser = userName => ({
    type: SET_USER,
    payload: userName
});

export const setError = error => ({
    type: SET_ERROR,
    payload: error
});

export const setMessages = items => ({
    type: SET_MESSAGES,
    payload: items
});

export const setStart = isStarted => ({
    type: SET_START,
    payload: isStarted
})
