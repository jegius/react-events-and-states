export const ADD_MESSAGE = "ADD_MESSAGE"; // используется для добавления нового сообщения в существующий массив сообщений в состоянии
export const SET_MESSAGES = "SET_MESSAGES"; // используется для установки всего массива сообщений в состоянии

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
        authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1KIiwiaWF0IjoxNzE1Nzc4NDI4fQ.y91qfX5_D9mpFUjp5tS5k6tigHfuMumAuhHAOSC6Vzw"}`, //сохранённый токен
      },
    });

    // Извлечь данные из ответа
    const data = await response.json();
    return data.messages;
    
  } catch (error) {
    console.error(error);
  }
};
