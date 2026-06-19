import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, clearAuthError } from '../features/auth/authSlice';

export default function AuthPage() {
  const dispatch = useDispatch();
  const { status, registerStatus, error } = useSelector((state) => state.auth);

  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const isLoginMode = mode === 'login';
  const isLoading = status === 'loading' || registerStatus === 'loading';

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    dispatch(clearAuthError());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = form.username.trim();
    const password = form.password.trim();

    if (!username || !password) {
      return;
    }

    const credentials = {
      username,
      password,
    };

    try {
      if (isLoginMode) {
        await dispatch(loginUser(credentials)).unwrap();
      } else {
        await dispatch(registerUser(credentials)).unwrap();
        await dispatch(loginUser(credentials)).unwrap();
      }
    } catch {
      // Ошибка уже сохраняется в Redux slice
    }
  };

  const handleModeChange = () => {
    setMode((prevMode) => (prevMode === 'login' ? 'register' : 'login'));
    dispatch(clearAuthError());
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>{isLoginMode ? 'Вход в чат' : 'Регистрация'}</h1>

        <p className="auth-description">
          {isLoginMode
            ? 'Войдите, чтобы читать и отправлять сообщения в общем чате.'
            : 'Создайте аккаунт, чтобы получить доступ к глобальному чату.'}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Имя пользователя
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Введите имя"
              autoComplete="username"
            />
          </label>

          <label>
            Пароль
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              autoComplete={isLoginMode ? 'current-password' : 'new-password'}
            />
          </label>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading
              ? 'Загрузка...'
              : isLoginMode
                ? 'Войти'
                : 'Зарегистрироваться'}
          </button>
        </form>

        <button className="switch-mode-button" type="button" onClick={handleModeChange}>
          {isLoginMode
            ? 'Нет аккаунта? Зарегистрироваться'
            : 'Уже есть аккаунт? Войти'}
        </button>
      </section>
    </main>
  );
}