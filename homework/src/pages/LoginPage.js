import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, clearError } from '../features/auth/authSlice';
import { selectAuthError, selectAuthStatus, selectCurrentToken } from '../features/auth/authSlice';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const error = useSelector(selectAuthError);
  const status = useSelector(selectAuthStatus);
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    dispatch(clearError());
  }, [isLogin, dispatch]);

  useEffect(() => {
    if (token) {
      navigate('/chat');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      return;
    }

    if (isLogin) {
      await dispatch(loginUser({ username, password }));
    } else {
      await dispatch(registerUser({ username, password }));
      
      if (status === 'succeeded') {
        await dispatch(loginUser({ username, password }));
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button 
          type="submit" 
          style={{ width: '100%', padding: '10px' }}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Processing...' : isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        style={{ marginTop: '10px', width: '100%', padding: '10px' }}
        disabled={status === 'loading'}
      >
        {isLogin ? 'Need to register?' : 'Already have an account?'}
      </button>
    </div>
  );
};

export default LoginPage;