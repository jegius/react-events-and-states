//Здесь перечислены функции селекторов Redux, которые извлекают данные из состояния Redux. Это обычные функции JavaScript, которые принимают состояние Redux и возвращают некоторые данные из него.

export const selectMessages = store => store.messages; // Эта функция извлекает массив `messages` из состояния хранилища
export const selectIsStarted = store => store.isStarted; // Возвращает булево значение`isStarted`, которое показывает, начался ли чат
export const selectUser = store => store.user; // Возвращает текущего пользователя из состояния Redux
export const selectShowRegistration = store => store.isShowRegistration; // Возвращает булево значение `isShowRegistration`, которое указывает, показана ли в данный момент регистрация
export const selectIsCanWrite = store => store.isCanWrite; // Возвращает булево значение `isCanWrite`, которое указывает, может ли пользователь писать в чате
// export const allWriters = (store) => store?.items?.reduce((result, {writed}) => result + writed.length, 0) ?? 0; // Извлекает общее количество участников часта из состояния Redux.
