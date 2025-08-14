import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setError } from '../store/userSlice';
import Loader from './Loader';
import * as styles from '../styles';

const Register = ({ onSwitchToLogin }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [isHoverRegisterBtn, setIsHoverRegisterBtn] = useState(false);
  const [isHoverLoginBtn, setIsHoverLoginBtn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setRegistrationError('');
    const newErrors = {};

    if (formData.username.length < 3 || formData.username.length > 15) {
      newErrors.username = 'Логин должен быть от 3 до 15 символов.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают.';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/register', {
        username: formData.username,
        password: formData.password,
      });
      if (response.data.message) {
        setSuccessMessage('Регистрация прошла успешно! Пожалуйста, войдите в систему.');
        setTimeout(() => {
          setSuccessMessage('');
          onSwitchToLogin();
        }, 2000);
      } else {
        setRegistrationError('Ошибка регистрации. Попробуйте снова.');
      }
    } catch (error) {
      const data = error.response?.data;
      if (data?.message?.toLowerCase().includes('user already exists')) {
        setRegistrationError('Пользователь с таким именем уже существует.');
      } else {
        dispatch(setError(data?.error || 'Ошибка регистрации'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ color: 'black' }}>
      <h2 style={styles.title}>Регистрация</h2>
      <form onSubmit={handleSubmit} style={styles.formStyle}>
        <div style={styles.inputContainer}>
          <input
            type="text"
            name="username"
            placeholder="Введите логин"
            value={formData.username}
            onChange={handleChange}
            disabled={loading}
            required
            style={styles.input}
          />
          {errors.username && <p style={styles.errorText}>{errors.username}</p>}
        </div>
        <div style={styles.inputContainer}>
          <input
            type="password"
            name="password"
            placeholder="Введите пароль"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Подтвердите пароль"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
            required
            style={styles.input}
          />
          {errors.confirmPassword && <p style={styles.errorText}>{errors.confirmPassword}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          style={isHoverRegisterBtn ? { ...styles.buttonBase, ...styles.sendButtonHover } : styles.buttonBase}
          onMouseEnter={() => setIsHoverRegisterBtn(true)}
          onMouseLeave={() => setIsHoverRegisterBtn(false)}
        >
          {loading ? <Loader /> : 'Зарегистрироваться'}
        </button>
      </form>
      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
      {registrationError && <p style={styles.errorText}>{registrationError}</p>}
      <div style={{ textAlign: 'center', marginTop: 10 }}>
        <p style={{ ...styles.buttonText, fontWeight: 'normal', marginBottom: 4 }}>Уже зарегистрированы?</p>
        <button
          type="button"
          disabled={loading}
          onClick={onSwitchToLogin}
          onMouseEnter={() => setIsHoverLoginBtn(true)}
          onMouseLeave={() => setIsHoverLoginBtn(false)}
          style={{
            ...styles.linkButtonText,
            textDecoration: isHoverLoginBtn ? 'underline' : 'none',
          }}
        >
          Войти
        </button>
      </div>
    </div>
  );
};

export default Register;