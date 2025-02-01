// src/components/AuthForm.jsx
import React, { useState } from 'react';

const AuthForm = ({ onAuth, type = 'login' }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isLogin = type === 'login';

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
    </form>
  );
};

export default AuthForm;