import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { MessageForm } from "../components/MessageForm";
import { MessageList } from "../components/MessageList";

export const ChatPage = () => {
  const nagitation = useNavigate();

  useEffect(() => { // Если пользователь существует, при перезагрузке страницы, вместо авторизации остаётся на ней
    const user = localStorage.getItem('user'); // получаем объект user из локального хранилища
    if (user) { 
      const userData = JSON.parse(user); // Распарсиваем строку JSON, содержащую данные пользователя
      if (!userData.token) { // Если пользователь не авторизован, остаётся на странице с логином
        nagitation('/login'); 
      }
    } else {
      nagitation('/login'); // Если сущестыует, то переходит к чатам
    }
  }, [nagitation]);

  const handleLogout = () => { //Выход из учётной записи
    localStorage.removeItem('user'); // Удаляем из localStorage пользователя
    nagitation('/login'); // И переходим к авторизации
  }

  return (
    <>
      <div className="chat-wrapper">
        <div className="title-container" onClick={handleLogout}>
          <div></div>
          <div><h1 className="title">Global Chat</h1></div>
          <button className="log-out" onClick={handleLogout}>Log Out</button>
        </div>
        <MessageList />
        <MessageForm />
      </div>
    </>
  );
};
