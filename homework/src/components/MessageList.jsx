import React, { useState, useEffect } from "react";
import Message from "./Message";

export const MessageList = () => {
  const [messages, setMessages] = useState([]);
//   const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    // Загружаем сообщения из хранилища
    const storedMessages = JSON.parse(localStorage.getItem("messages") || "[]");
    setMessages(storedMessages);
  }, []);

  useEffect(() => {
    // Сохраняем сообщения в хранилище
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="messageList">
      {messages.map((message) => (
        <Message key={message.id} message={message} 
        // isCurrentUser={message.username === currentUser.username} 
        />
      ))}
    </div>
  );
};
