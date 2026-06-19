import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { clearChat, fetchMessages } from '../features/chat/chatSlice';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

export default function ChatPage() {
  const dispatch = useDispatch();

  const { username } = useSelector((state) => state.auth);
  const { messages, status, error, lastLoadedAt } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchMessages());
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearChat());
  };

  return (
    <main className="chat-page">
      <section className="chat-card">
        <header className="chat-header">
          <div>
            <h1>Глобальный чат</h1>
            <p>Вы вошли как <strong>{username}</strong></p>
          </div>

          <div className="chat-header-actions">
            <button type="button" onClick={handleRefresh}>
              Обновить
            </button>

            <button type="button" className="logout-button" onClick={handleLogout}>
              Выйти
            </button>
          </div>
        </header>

        {lastLoadedAt && (
          <p className="cache-info">
            Последняя загрузка: {new Date(lastLoadedAt).toLocaleTimeString()}
          </p>
        )}

        {status === 'loading' && messages.length === 0 && (
          <p className="status-message">Загружаем сообщения...</p>
        )}

        {error && <p className="error-message">{error}</p>}

        <MessageList messages={messages} currentUsername={username} />

        <MessageInput />
      </section>
    </main>
  );
}