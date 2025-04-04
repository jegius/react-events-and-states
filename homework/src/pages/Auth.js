import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/userSlice";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";  // Импортируем useNavigate


const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Получаем доступ к navigate

  const handleAuth = async (username, password) => {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      // Авторизация прошла успешно
      dispatch(login({ token: data.token, username }));
      localStorage.setItem("user", JSON.stringify({ token: data.token, username }));
      
      // После успешной авторизации редиректим на страницу чата
      navigate("/chat");
    } else {
      alert("Ошибка авторизации");
    }
  };

  return <AuthForm onAuth={handleAuth} />;
};

export default Auth;