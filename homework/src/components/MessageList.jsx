import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChats } from "../store/actions";
import Message from "./Message";

export const MessageList = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);

  useEffect(() => {
    // Загрузить историю сообщений с сервера
    getChats().then((data) => {
      // Сохранить историю сообщений в состоянии Redux
      dispatch({ type: "SET_MESSAGES", payload: data });
    });
  }, []);


  return (
    <div className="messageList">
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>{message.username}:</strong> {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
