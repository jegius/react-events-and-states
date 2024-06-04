import React, { useEffect, useRef } from "react";
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
  const messages = useSelector((state) => state.chat.messages);
  const currentUser = useSelector((state) => state.auth.currentUser.token);
  const lastMessageRef = useRef(null); // добавляем ref к последнему сообщению в списке
  const dispatch = useDispatch();

  useEffect(() => {
    getChats(currentUser) // Передаем currentUser в getChats
      .then((res) => {
        if (res) {
          dispatch({ type: SET_MESSAGES, payload: res });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentUser, dispatch]); // Зависимость от токена указывает на то, что эффект должен запускаться снова при изменении токена

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Прокрутка к последнему элементу списка при изменении истории сообщений

  return (
    <div className="messageList">
      <ul>
        {messages?.map((message, index) => (
          <Message 
            key={message.id} 
            message={message} 
            ref={lastMessageRef} // Добавляем реф к последнему элементу списка 
          />
        ))}
      </ul>
    </div>
  );
};
