import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { logout } from "../store/userSlice";
import { FixedSizeList as List } from "react-window";
import "../styles/Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const listRef = useRef(null);

  const fetchMessages = async () => {
    if (token) {
      try {
        const response = await axios.get("http://localhost:3001/chats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(response.data);
      } catch (err) {
        console.error("Ошибка получения сообщений:", err);
      }
    }
  };

  useEffect(() => {
    fetchMessages();

    const intervalId = setInterval(fetchMessages, 10000);

    return () => clearInterval(intervalId);
  }, [token]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToItem(messages.length - 1);
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!token) {
      console.log("Токен отсутствует");
      return;
    }
    try {
      await axios.post(
        "http://localhost:3001/chats",
        { body: newMessage },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchMessages();
      setNewMessage("");
    } catch (err) {
      console.error("Ошибка отправки сообщения:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  const renderMessage = ({ index, style }) => {
    const msg = messages[index];
    return (
      <div style={style} className="message" key={index}>
        <p>
          <strong>{msg.username}:</strong> {msg.body}
        </p>
      </div>
    );
  };

  return (
    <div className="chat-container">
      <h2>Глобальный чат</h2>
      <div className="messages-container">
        <List
          height={400}
          itemCount={messages.length}
          itemSize={40}
          width="100%"
          ref={listRef}
        >
          {renderMessage}
        </List>
      </div>
      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          required
          className="message-input"
        />
        <button type="submit" className="send-button">
          Отправить
        </button>
      </form>
      <button onClick={handleLogout} className="logout-button">
        Выйти
      </button>
    </div>
  );
};

export default Chat;
