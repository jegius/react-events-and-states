import React from "react";
import { PrivateRoute } from "../store/PrivateRoute";
import { MessageForm } from "../components/MessageForm";
import { MessageList } from "../components/MessageList";

export const ChatPage = () => {
  return (
    <>
      <PrivateRoute>
        <div className="chat-wrapper">
          <h1 className="title">Global Chat</h1>
          <MessageList />
          <MessageForm />
        </div>
      </PrivateRoute>
    </>
  );
};
