import React, { useEffect } from "react";
import MessageList from "../components/MessageList";
import MessageForm from "../components/MessageForm";
import { useSelector } from 'react-redux';

const ChatPage = () => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) { // Если пользователь не авторизован, перенаправить на страницу регистрации
      window.location.href = '/registration';
    }
  }, [isAuthenticated])

  return (
    <>
      {/* Если пользователь авторизован, отобразить чат */}
      {isAuthenticated && (
        <div>
          <h1 className="title">Global Chat</h1>
          <MessageList/>
          <MessageForm/>
        </div>
      )}
    </>
  );
};

export default ChatPage;