import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setMessages, addMessage } from '../store/chatSlice';
import { clearUser  } from '../store/userSlice';
import VirtualizedMessageList from './VirtualizedMessageList';
import Loader from './Loader';
import * as styles from '../styles';

const Chat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const token = useSelector((state) => state.user.token);
  const username = useSelector((state) => state.user.username);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [containerHeight, setContainerHeight] = useState(window.innerHeight - 220);
  const virtualListRef = useRef(null);
  const cancelTokenSource = useRef(null);

  useEffect(() => {
    const calculateHeight = () => {
      const totalHeight = window.innerHeight;
      const headerElem = document.querySelector('div[style*="background-color: #B4DEF5"]');
      const headerHeight = headerElem ? headerElem.offsetHeight : 0;
      const inputForm = document.querySelector('form[aria-label="Отправить сообщение"]');
      const inputFormHeight = inputForm ? inputForm.offsetHeight : 0;
      const padding = 20;
      const newHeight = totalHeight - headerHeight - inputFormHeight - padding;
      setContainerHeight(newHeight > 100 ? newHeight : 300);
    };
    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => window.removeEventListener('resize', calculateHeight);
  }, []);

  const loadMessagesFromLocalStorage = () => {
    const savedMessages = localStorage.getItem('messages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  };

  const pollMessages = useCallback(async () => {
    if (!token) return;
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('New poll request triggered');
    }
    cancelTokenSource.current = axios.CancelToken.source();
    try {
      const response = await axios.get('http://localhost:3001/chats', {
        headers: { Authorization: `Bearer ${token}` },
        cancelToken: cancelTokenSource.current.token,
      });
      dispatch(setMessages(response.data));
      localStorage.setItem('messages', JSON.stringify(response.data));
      setError(null);
      pollMessages();
    } catch (err) {
      if (axios.isCancel(err)) return;
      setError('Ошибка при обновлении сообщений');
      setTimeout(pollMessages, 5000);
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (token) {
      const initialMessages = loadMessagesFromLocalStorage();
      dispatch(setMessages(initialMessages));
      pollMessages();
    }
    return () => {
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel('Component unmounted');
      }
    };
  }, [dispatch, pollMessages, token]);

  const handleMouseEnter = (e, hoverColor) => {
    e.currentTarget.style.backgroundColor = hoverColor;
  };

  const handleMouseLeave = (e, baseColor) => {
    e.currentTarget.style.backgroundColor = baseColor;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:3001/chats',
        { body: newMessage, username },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const messageWithUsername = {
        body: newMessage,
        username: response.data.username || username,
      };
      dispatch(addMessage(messageWithUsername));
      const updatedMessages = [...messages, messageWithUsername];
      localStorage.setItem('messages', JSON.stringify(updatedMessages));
      setNewMessage('');
      if (virtualListRef.current) {
        virtualListRef.current.scrollToBottom();
      }
    } catch {
      setError('Ошибка при отправке сообщения');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('User  logged out');
    }
    dispatch(clearUser ());
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerWrapper}>
          {username && <span style={styles.title}>Привет, {username}!</span>}
          <button
            onClick={handleLogout}
            style={styles.buttonBase}
            aria-label="Выйти из чата"
            type="button"
            onMouseEnter={(e) => handleMouseEnter(e, styles.sendButtonHover.backgroundColor)}
            onMouseLeave={(e) => handleMouseLeave(e, styles.buttonBase.backgroundColor)}
          >
            Выйти
          </button>
        </div>
      </div>
      {loading && <Loader />}
      {error && <p style={styles.errorText}>{error}</p>}
      <div style={{ height: containerHeight, overflow: 'hidden' }}>
        <div style={styles.messageListContainer}>
          <VirtualizedMessageList
            ref={virtualListRef}
            messages={messages}
            height={containerHeight - 150}
            itemHeight={styles.common.itemHeight}
            width="100%"
            currentUsername={username}
          />
        </div>
      </div>
      <form onSubmit={handleSendMessage} style={styles.inputForm} aria-label="Отправить сообщение">
        <input
          type="text"
          placeholder="Введите сообщение..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={styles.input}
          disabled={loading}
        />
        <button
          type="submit"
          style={{
            ...styles.buttonBase,
            marginLeft: '10px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s',
          }}
          disabled={loading}
          onMouseEnter={(e) => handleMouseEnter(e, styles.sendButtonHover.backgroundColor)}
          onMouseLeave={(e) => handleMouseLeave(e, styles.buttonBase.backgroundColor)}
        >
          Отправить
        </button>
      </form>
    </div>
  );
};

export default Chat;