// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
      <Routes>
          <Route path="/" element={<AuthPage />} />
        <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
}

export default App;