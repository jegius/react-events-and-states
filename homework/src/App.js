import React from 'react';
import { useSelector } from 'react-redux';
import AuthPage from './components/AuthPage';
import ChatPage from './components/ChatPage';

export default function App() {
  const token = useSelector(s=>s.auth.token);
  return token ? <ChatPage/> : <AuthPage/>;
}
