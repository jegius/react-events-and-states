// src/components/Chat.jsx
import React, { useState } from 'react';
import Message from './Message';
import VirtualScroll from './VirtualScroll'


const Chat = ({ messages, sendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };
    const renderMessage = (message) => {
        return <Message  username={message.username} body={message.body} />
    }


  return (
    <div>
      <h2>Chat</h2>
          <VirtualScroll items={messages} renderItem={renderMessage} itemHeight={50} />
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
    </div>
  );
};

export default Chat;