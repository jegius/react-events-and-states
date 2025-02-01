// src/pages/ChatPage.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chat from '../components/Chat';
import { addMessageToChat, setMessages } from '../redux/slices/messagesSlice';
import { sendMessageToChat, getChatMessages } from '../utils/api';
import { useNavigate } from 'react-router-dom';


const ChatPage = () => {
  const messages = useSelector((state) => state.messages.messages);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      if (!user.isLoggedIn) {
          navigate('/');
        }
    }, [user.isLoggedIn, navigate]);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getChatMessages(user.token);
          console.log(fetchedMessages)
        dispatch(setMessages(fetchedMessages));
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };
    if (user.isLoggedIn) {
        fetchMessages();
    }
  }, [dispatch, user.isLoggedIn, user.token]);


  const handleSendMessage = async (body) => {
      try {
        const sentMessage = await sendMessageToChat(user.token, body);
          console.log(sentMessage)
          dispatch(addMessageToChat({ username: user.username, body: body }));

      } catch (error) {
        console.error('Failed to send message:', error);
      }
  };

  return (
    <div>
      <Chat messages={messages} sendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;