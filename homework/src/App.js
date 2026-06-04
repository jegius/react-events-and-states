import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, logout, clearError } from './redux/authSlice';
import { fetchMessages, sendMessage } from './redux/chatSlice';
import { VirtualList } from './VirtualList';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [chatText, setChatText] = useState('');

  const dispatch = useDispatch();

  const { user, token, status, error, registerSuccess } = useSelector((state) => state.auth);
  const chatState = useSelector((state) => state.chat);
  const messages = chatState.messages;
  const chatError = chatState.error;

  useEffect(() => {
    if (registerSuccess) {
      alert('Регистрация успешна! Теперь вы можете войти.');
      setIsLogin(true);
      setPassword(''); 
    }
  }, [registerSuccess]);

  useEffect(() => {
    if (token) {
      dispatch(fetchMessages());
    }
  }, [token, dispatch]);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    dispatch(clearError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = { username, password };

    if (isLogin) {
      dispatch(loginUser(credentials));
    } else {
      dispatch(registerUser(credentials));
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!chatText.trim()) return;
    dispatch(sendMessage(chatText));
    setChatText('');
  };

  if (token) {
    return (
      <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'sans-serif' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3>🌐 Глобальный чат (Логин: {user?.username})</h3>
          <button 
            onClick={() => dispatch(logout())} 
            style={{ padding: '6px 12px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Выйти
          </button>
        </header>

        {chatError && (
          <div style={{ color: 'white', background: '#dc3545', padding: '10px', borderRadius: '4px', marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }}>
            {chatError}
          </div>
        )}

        <VirtualList 
          items={messages} 
          itemHeight={50} 
          windowHeight={400} 
          renderItem={(msg, index) => (
            <div key={msg.id || index} style={{ height: '50px', padding: '5px 10px', boxSizing: 'border-box', borderBottom: '1px solid #eee', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontSize: '11px', color: '#888', fontWeight: 'bold' }}>{msg.username || 'Аноним'}</span>
              <span style={{ fontSize: '14px', color: '#333' }}>{msg.body}</span>
            </div>
          )} 
        />

        <form onSubmit={handleSend} style={{ display: 'flex', marginTop: '10px' }}>
          <input 
            type="text" 
            value={chatText} 
            onChange={e => setChatText(e.target.value)} 
            placeholder="Напишите сообщение..." 
            style={{ flexGrow: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '4px 0 0 4px', outline: 'none' }}
          />
          <button 
            type="submit" 
            style={{ padding: '10px 20px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '0 4px 4px 0', cursor: 'pointer' }}
          >
            Отправить
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', fontFamily: 'sans-serif', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{isLogin ? 'Войти в Глобальный чат' : 'Регистрация'}</h2>
      
      {error && <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Имя пользователя (Логин)" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          required 
          disabled={status === 'loading'}
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px', boxSizing: 'border-box' }}
        />
        <input 
          type="password" 
          placeholder="Пароль" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          required 
          disabled={status === 'loading'}
          style={{ display: 'block', width: '100%', marginBottom: '15px', padding: '8px', boxSizing: 'border-box' }}
        />
        <button 
          type="submit" 
          disabled={status === 'loading'}
          style={{ width: '100%', padding: '10px', background: status === 'loading' ? '#6c757d' : '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {status === 'loading' ? 'Загрузка...' : isLogin ? 'Войти' : 'Создать аккаунт'}
        </button>
      </form>
      <button 
        onClick={toggleMode} 
        disabled={status === 'loading'}
        style={{ marginTop: '15px', background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
      >
        {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
      </button>
    </div>
  );
}

export default App;
