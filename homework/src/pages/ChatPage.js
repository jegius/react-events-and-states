import React from "react";
import Chat from "../components/Chat";
import { useSelector } from "react-redux";


const ChatPage = () => {
  const token = useSelector((state) => state.user.token);
  return token ? <Chat /> : <p>Пожалуйста, авторизуйтесь</p>;
};

export default ChatPage;
