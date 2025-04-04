import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, addMessage } from "../redux/slices/messagesSlice";
import Message from "./Message";
import { FixedSizeList as List } from "react-window";
import "./Form.css"

const Chat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const token = useSelector((state) => state.user.token);
  const [newMessage, setNewMessage] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    const cachedMessages = localStorage.getItem("chat_messages");
    if (cachedMessages) {
      dispatch(setMessages(JSON.parse(cachedMessages)));
    }
    fetch("http://localhost:3001/chats", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setMessages(data));
        localStorage.setItem("chat_messages", JSON.stringify(data));
      });
  }, [dispatch, token]);

  const sendMessage = async () => {
    const response = await fetch("http://localhost:3001/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ body: newMessage }),
    });
    if (response.ok) {
      const message = { username: "Вы", body: newMessage };
      dispatch(addMessage(message));
      localStorage.setItem("chat_messages", JSON.stringify([...messages, message]));
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h2>Глобальный чат</h2>
      <div className="messages" ref={chatRef}>
        <List
          height={300}
          itemCount={messages.length}
          itemSize={50}
          width={"100%"}
        >
          {({ index, style }) => (
            <div style={{ ...style, width: "100%"}}>
              <Message {...messages[index]} />
            </div>
          )}
        </List>
      </div >
      <input
        
        type="text"
        placeholder="Введите сообщение"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Отправить</button>
    </div>
  );
};

export default Chat;