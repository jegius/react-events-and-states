import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_MESSAGE } from '../store/actions'

export const MessageForm = () => {
  const [message, setMessage] = useState("");
  const currentUser = useSelector((state) => state.auth.currentUser);
     

  const dispatch = useDispatch();

  const sendMessageToServer = async (message) => {
    const res = await fetch('http://localhost:3001/chats', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
      body: JSON.stringify({ username: currentUser.username, body: message }),
    });

    if (res.ok) {
      console.log(currentUser)
      return true;
    } else {
      return false;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const messageSent = await sendMessageToServer(message);
    
    if(messageSent) {
      dispatch({ type: ADD_MESSAGE, payload: { username: currentUser.username, body: message } });
      setMessage("");
      console.log({ username: currentUser.username, body: message });
    } else {
      alert("Message sending failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="messageFormContainer">     
        <div>
            <span> {currentUser.username}</span>
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
