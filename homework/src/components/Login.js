import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser  , setError } from '../store/userSlice';
import Loader from './Loader';
import * as styles from '../styles';

const Login = ({ onSwitchToRegister, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isHoverLogin, setIsHoverLogin] = useState(false); 
  const [isHoverRegister, setIsHoverRegister] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      const token = response.data.token;
      const decoded = jwtDecode(token);
      const usernameFromToken = decoded.username || decoded.user || decoded.sub || null;
      dispatch(setUser  ({ username: usernameFromToken, token }));
      if (onLoginSuccess) onLoginSuccess();
    } catch (error) {
      const msg = error.response?.data?.error || 'Ошибка входа: неверный логин или пароль';
      setLoginError(msg);
      dispatch(setError(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ color: 'black' }}>
      <h2 style={styles.title}>Вход</h2>
      <form onSubmit={handleLogin} style={styles.formStyle}>
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Логин"
            required
            disabled={loading}
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Пароль"
            required
            disabled={loading}
            style={styles.input}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={isHoverLogin ? { ...styles.buttonBase, ...styles.sendButtonHover } : styles.buttonBase}
          onMouseEnter={() => setIsHoverLogin(true)}
          onMouseLeave={() => setIsHoverLogin(false)}
        >
          {loading ? <Loader /> : 'Войти'}
        </button>
        {loginError && <p style={styles.errorText}>{loginError}</p>}
      </form>
      <div style={{ textAlign: 'center', marginTop: 10 }}>
        <p style={{ ...styles.buttonText, fontWeight: 'normal', marginBottom: 4 }}>Нет аккаунта?</p>
        <button
          type="button"
          disabled={loading}
          onClick={onSwitchToRegister}
          onMouseEnter={() => setIsHoverRegister(true)}
          onMouseLeave={() => setIsHoverRegister(false)}
          style={{
            ...styles.linkButtonText,
            textDecoration: isHoverRegister ? 'underline' : 'none',
          }}
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
};

export default Login;