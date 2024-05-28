import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_MESSAGES } from '../store/actions';
import Message from "./Message";

const getChats = async (currentUser) => {
  // Загрузить историю сообщений с сервера
  const res = await fetch('http://localhost:3001/chats', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${currentUser}`, // токен
    },
  });
  // Извлечь данные из ответа
  const data = await res.json();
  if (res.ok) {
    console.log(data);
    return data;
  } else {
    return await Promise.reject(res.status);
  }
};

export const MessageList = () => {
  const messages = useSelector((state) => state.chat);
  const currentUser = useSelector((state) => state.auth.currentUser.token);
  const dispatch = useDispatch();

  useEffect(() => {
    getChats(currentUser) // Передаем currentUser в getChats
      .then((res) => {
        if (res.messages) {
        
          dispatch({ type: SET_MESSAGES, payload: res.messages });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentUser, dispatch]); // Зависимость от токена указывает на то, что эффект должен запускаться снова при изменении токена

  return (
    <div className="messageList">
      <ul>
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </ul>
    </div>
  );
};
