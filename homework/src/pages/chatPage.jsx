import React, { useEffect } from "react";
import { MessageForm } from "../components/MessageForm";
import { MessageList } from "../components/MessageList";
import { useNavigate } from "react-router-dom";

export const ChatPage = () => {
  const nagitation = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem('token'); // получаем токен из localStorage
      if (token) {
        console.log(token); // Выводим токен в консоль, чтобы убедиться, что токен существует
        nagitation('/chat'); // Перенаправляем на страницу чата, если есть токен в localStorage
      }
  }, [nagitation]);

  return (
    <>
      <div className="chat-wrapper">
        <h1 className="title">Global Chat</h1>
        <MessageList />
        <MessageForm />
      </div>
    </>
  );
};


