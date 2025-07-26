import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import './Message.css';

const Message = ({ message }) => {
  const currentUser = useSelector(selectCurrentUser);
  const isCurrentUser = currentUser?.username === message.username;

  return (
    <div className={`message ${isCurrentUser ? 'message-current-user' : 'message-other-user'}`}>
      <div className="message-username">{message.username}</div>
      <div>{message.body}</div>
      {message.createdAt && (
        <div className="message-time">
          {new Date(message.createdAt).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export default Message;