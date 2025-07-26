import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { fetchChats, postMessage } from '../features/chat/chatSlice';
import Message from '../components/Message';
import './ChatPage.css';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messages = useSelector((state) => state.chat.messages);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (token) {
      dispatch(fetchChats(token));
      const interval = setInterval(() => dispatch(fetchChats(token)), 3000);
      return () => clearInterval(interval);
    } else {
      navigate('/login');
    }
  }, [token, navigate, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() && token) {
      await dispatch(postMessage({ message, token }));
      setMessage('');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Global Chat</h2>
        <div>
          <span style={{ marginRight: '15px' }}>Hello, {user?.username}</span>
          <button className="chat-button chat-button-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <Message key={`${msg.username}-${index}`} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button type="submit" className="chat-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;