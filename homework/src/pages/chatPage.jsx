import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { MessageForm } from "../components/MessageForm";
import { MessageList } from "../components/MessageList";
import io from 'socket.io-client';

export const UserCount = ({ socket }) => { //Количество активных пользователей
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    socket.on("user connected", () => {
      setUserCount(userCount + 1);
    });

    socket.on("user disconnected", () => {
      setUserCount(userCount - 1);
    });

    return () => {
      socket.off("user connected");
      socket.off("user disconnected");
    };
  }, [socket]);

  return <div>{userCount} users online</div>;
}


export const ChatPage = () => { // Страница с чатом
  const [storedUser, setStoredUser] = useState(null);
  const navigation = useNavigate();
  const socket = io('http://localhost:3001/login'); // Подключение к серверу Socket.IO

  useEffect(() => { // Если пользователь существует, при перезагрузке страницы, вместо авторизации остаётся на ней
    const user = localStorage.getItem('user'); 
    if (user) { 
      const userData = JSON.parse(user);
      if (userData.token) { // Если пользователь не авторизован, остаётся на странице с логином
        setStoredUser(JSON.parse(user))
        navigation('/chat'); 
      }
    } else {
      navigation('/chat'); // Если существует, то переходит к чатам
    }
  }, [navigation]);


  const handleLogout = () => { //Выход из учётной записи
    localStorage.removeItem('user'); // Удаляем из localStorage пользователя
    navigation('/login');
  }

  return (
  <div className="chat-page">
    {storedUser && <div className="user-list">
      <p><UserCount socket={socket} /></p>
      -----------------
      <p>{storedUser.username}</p>
    </div>}

    <div className="chat-wrapper">
      
      <div className="title-container">
        <div></div>
        <div><h1 className="title">Global Chat</h1></div>
        <button className="log-out_button" onClick={handleLogout}>Log Out</button>
      </div>
      
      <MessageList />

      <div className="messageFormContainer">   
        <MessageForm />
      </div>
    </div>
  </div> 
  );
};