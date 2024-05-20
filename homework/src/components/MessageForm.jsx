import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_MESSAGE } from '../store/actions'

const sendMessage = async (message, token) => {
  // Отправить сообщение на сервер
  const res = await fetch('http://localhost:3001/chats', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, //сохранённый токен
    },
    body: JSON.stringify({ message }),
  });

  // Извлечь данные из ответа
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    return await Promise.reject(res.status);
  }
}

export const MessageForm = () => {
  const [message, setMessage] = useState("");
  const currentUser = useSelector((state) => state.auth.currentUser.token);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Отправить сообщение на сервер
    const data = await sendMessage(message, currentUser);

    // Добавить сообщение в историю сообщений
    dispatch({ type: ADD_MESSAGE, payload: data.message });

    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="messageFormContainer">     
        <div>
            <input
                className="message-input"
                type="text"
                placeholder="Enter your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
        </div>
        <button className="button" type="submit">Send</button>
      </div>
    </form>
  );
};
