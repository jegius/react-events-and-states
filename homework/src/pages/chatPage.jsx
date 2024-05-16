import React from "react";
import { PrivateRoute } from "../store/PrivateRoute";
import { MessageForm } from "../components/MessageForm";
import { MessageList } from "../components/MessageList";
import { Routes } from 'react-router-dom'; // Импортируйте Routes

export const ChatPage = () => {
  return (
    <>
      <Routes> {/* Добавьте Routes здесь */}
        <PrivateRoute>
          <div className="chat-wrapper">
            <h1 className="title">Global Chat</h1>
            <MessageList />
            <MessageForm />
          </div>
        </PrivateRoute>
      </Routes>
    </>
  );
};


