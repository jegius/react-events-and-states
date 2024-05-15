import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../store/actions";

export const MessageForm = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Отправить сообщение на сервер
    sendMessage(message).then((data) => {
      // Добавить сообщение в историю сообщений
      dispatch({ type: "ADD_MESSAGE", payload: data });
    });

    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="messageFormContainer">     
        <div>
            <input
                className="message-input"
                type="text"
                placeholder="Enter your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
        </div>
        <button className="button" type="submit">Send</button>
      </div>
    </form>
  );
};
