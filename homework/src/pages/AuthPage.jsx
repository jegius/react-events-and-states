// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/userSlice';
import AuthForm from '../components/AuthForm';
import { login, register } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleAuth = async (authData) => {
    try {
        const authFunction = isLogin ? login : register;
      const data = await authFunction(authData);
      dispatch(loginSuccess({ token: data.token, username: authData.username }));
      navigate('/chat');

    } catch (error) {
      console.error('Authentication failed:', error);
      // Обработка ошибки
    }
  };

  return (
    <div>
      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? 'Register' : 'Login'}
      </button>
      <AuthForm onAuth={handleAuth} type={isLogin ? 'login' : 'register'} />
    </div>
  );
};

export default AuthPage;