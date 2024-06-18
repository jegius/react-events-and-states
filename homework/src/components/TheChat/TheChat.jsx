import { useEffect, useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import VirtualScroll from "../VirtualScroll/VirtualScroll";
import BaseButton from "../BaseButton/BaseButton";
import { setAllMesages } from "../../store/messagesSlice";
import { setChatStatus } from "../../store/globalChatSlice";

function TheChat() {
  const token = useSelector((state) => state.user.token);
  const currentUser = useSelector((state) => state.user.currentUser);
  const allMessages = useSelector((state) => state.messages.allMesages);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageText, setMessageText] = useState("");
  const items = allMessages.map((item, i) => (
    <li
      key={i}
      className={item.username === currentUser ? "message-cur" : "message"}
    >
      <span
        className={`${
          item.username === currentUser ? "username-current" : "username"
        }`}
      >
        {item.username}
      </span>
      <span
        className={`${
          item.username === currentUser ? "message-text-cur" : "message-text"
        }`}
      >
        {item.body}
      </span>
    </li>
  ));

  async function sendMessage() {
    if (!messageText) return;
    try {
      await fetch("http://localhost:3001/chats", {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: token,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          body: messageText,
        }),
      });
      setMessageText("");
    } catch (error) {
      console.error(`Error - ${error.name}: ${error.message}`);
    }
  }

  function handleLogout() {
    dispatch(setUser(""));
    dispatch(setToken(""));
    dispatch(setChatStatus("Logged out"));
    navigate("/");
  }

  async function getMessages() {
    try {
      const req = await fetch(`http://localhost:3001/chats`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
      });
      const answ = await req.json();
      dispatch(setAllMesages(answ));
    } catch (error) {
      console.error(`Error - ${error.name}: ${error.message}`);
    }
  }

  useEffect(() => {
    if (!allMessages) return;

    getMessages();
    dispatch(setChatStatus(`user ${currentUser} in chat`));
  }, [messageText]);

  return (
    <div className="chat">
      <h2>Чат</h2>
      <ul className="message-list">
        <VirtualScroll
          rowHeight={70}
          totalItems={items.length}
          containerHeight="300px"
          items={items}
          visibleItemsLength={6}
        />
      </ul>

      <div className="chat-wrap">
        <span className="chat-user">{currentUser}</span>
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="chat-input"
          type="text"
        />
        <BaseButton onClickProp={sendMessage} text={"📩"} />
      </div>
      <BaseButton onClickProp={handleLogout} text={"Выйти"} />
    </div>
  );
}

export default TheChat;
