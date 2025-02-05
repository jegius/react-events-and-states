import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/userSlice';
import axios from 'axios';
import '../styles/Registration.css';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register', {
        username,
        password,
      });

      if (response.status === 201 && response.data.message === "Registered successfully") {
        const loginResponse = await axios.post('http://localhost:3001/login', {
          username,
          password,
        });

        if (loginResponse.data.token) {
          dispatch(setUser({ username, token: loginResponse.data.token }));
          localStorage.setItem('token', loginResponse.data.token);
          navigate('/chat');
        }
      }
    } catch (err) {
      setError('Ошибка регистрации или входа: ' + err.message);
    }
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="registration-container">
      <h2>Регистрация</h2>
      <form onSubmit={handleRegister} className="registration-form">
        <div className="input-container">
          <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-button">Зарегистрироваться</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      
      <div className="login-link-container">
        <button onClick={handleGoToLogin} className="login-link-button">Уже есть аккаунт? Войти</button>
      </div>
    </div>
  );
};

export default Registration;

