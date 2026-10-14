import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, clearAuthError } from './authSlice';

export default function AuthPage() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    if (!username.trim() || !password) {
      setMessage('Заполни имя пользователя и пароль');
      return;
    }

    const credentials = {
      username: username.trim(),
      password,
    };

    if (isLogin) {
      const result = await dispatch(login(credentials));

      if (login.fulfilled.match(result)) {
        setMessage('Вход выполнен!');
      }
    } else {
      const result = await dispatch(register(credentials));

      if (register.fulfilled.match(result)) {
        setMessage('Регистрация успешна! Теперь войди в аккаунт.');
        setIsLogin(true);
      }
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setMessage('');
    dispatch(clearAuthError());
  };

  return (
    <main style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1>Глобальный чат</h1>
        <p>{isLogin ? 'Вход в аккаунт' : 'Создание аккаунта'}</p>

        <label htmlFor="username">Имя пользователя</label>
        <input
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
          required
        />

        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete={isLogin ? 'current-password' : 'new-password'}
          required
        />

        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.message}>{message}</p>}

        <button type="submit" disabled={loading}>
          {loading
            ? 'Подождите...'
            : isLogin
              ? 'Войти'
              : 'Зарегистрироваться'}
        </button>

        <button
          type="button"
          onClick={switchMode}
          style={styles.secondaryButton}
        >
          {isLogin
            ? 'Создать аккаунт'
            : 'Уже есть аккаунт? Войти'}
        </button>
      </form>
    </main>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    background: '#f1f5f9',
    fontFamily: 'Arial, sans-serif',
    padding: 20,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    width: '100%',
    maxWidth: 360,
    boxSizing: 'border-box',
    padding: 28,
    background: '#ffffff',
    borderRadius: 16,
    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
  },
  error: {
    color: '#dc2626',
  },
  message: {
    color: '#15803d',
  },
  secondaryButton: {
    background: '#e2e8f0',
    color: '#1e293b',
  },
};
