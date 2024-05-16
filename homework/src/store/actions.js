////Это файл redux actions. Экспортируеются константы, которые представляют различные типы действий, а также функции экшенов, которые возвращают объект действия с заданными параметрами.
export const ADD_MESSAGE = "ADD_MESSAGE"; // используется для добавления нового сообщения в существующий массив сообщений в состоянии
export const SET_MESSAGES = "SET_MESSAGES"; // используется для установки всего массива сообщений в состоянии
export const SET_CURRENTUSER = "SET_CURRENTUSER"; // используется для установки текущего пользователя. В данном файле не записан экшен, так как он происходит в файле Login.jsx

export const sendMessage = (message) => async (dispatch) => {
  try {
    // Отправить сообщение на сервер
    const response = await fetch('http://localhost:3001/chats', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    // Извлечь данные из ответа
    const data = await response.json();

    // Добавить сообщение в историю сообщений
    dispatch({ type: ADD_MESSAGE, payload: data.message });
  } catch (error) {
    console.error(error);
  }
};

export const getChats = async () => {
  try {
    // Загрузить историю сообщений с сервера
    const response = await fetch('http://localhost:3001/chats', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${""}`, //сохранённый токен
      },
    });

    // Извлечь данные из ответа
    const data = await response.json();
    return data.messages;
    
  } catch (error) {
    console.error(error);
  }
};

