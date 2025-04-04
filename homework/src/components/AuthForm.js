import React, { useState } from "react";
import { Link } from "react-router-dom"; // Импортируем Link для навигации
import "./Form.css"

const AuthForm = ({ onAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onAuth(username, password);
  };

  return (
    <div className="auth-container">
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Войти</button>
      </form>
      <p>
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link> {/* Ссылка на регистрацию */}
      </p>
    </div>
  );
};

export default AuthForm;