import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../auth/authSlice';
import VirtualScroll from './VirtualScroll';
import { VirtualScrollProvider } from './context/VirtualScrollContext';
import {
  fetchMessages,
  sendMessage,
  clearMessages,
} from '../messages/messagesSlice';

export default function ChatPage() {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { items, loading, sending, error } = useSelector(
    (state) => state.messages
  );

  const [text, setText] = useState('');

useEffect(() => {
  if (!token) return;
  dispatch(fetchMessages(token));
  const intervalId = setInterval(() => {
    dispatch(fetchMessages(token));
  }, 5000);

  return () => clearInterval(intervalId);
}, [dispatch, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = text.trim();

    if (!body || !token || sending) return;

    const result = await dispatch(sendMessage({ token, body }));

    if (sendMessage.fulfilled.match(result)) {
      setText('');
    }
  };

  const handleLogout = () => {
    dispatch(clearMessages());
    dispatch(logout());
  };

  return (
    <main style={styles.page}>
      <section style={styles.chat}>
        <header style={styles.header}>
          <div>
            <h1>Глобальный чат</h1>
            <p>Ты вошла как {user?.username}</p>
          </div>

          <button type="button" onClick={handleLogout}>
            Выйти
          </button>
        </header>

        <div style={styles.messages}>
          {loading && <p>Загружаем сообщения...</p>}

          {!loading && items.length === 0 && (
            <p>Пока сообщений нет. Напиши первое!</p>
          )}

        <VirtualScrollProvider>
         <VirtualScroll
          items={items}
          renderItem={(message) => (
         <article
           style={{
            ...styles.message,
            height: '100%',
            boxSizing: 'border-box',
            overflow: 'hidden',
            margin: 0,
            всеpadding: '4px 8px',
          }}
         >
          <strong>{message.username}</strong>
          <p style={{ margin: '4px 0' }}>{message.body}</p>
        </article>
        )}
        />
        </VirtualScrollProvider>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Напиши сообщение..."
            aria-label="Текст сообщения"
            maxLength={2000}
            disabled={sending}
          />

          <button type="submit" disabled={sending || !text.trim()}>
            {sending ? 'Отправка...' : 'Отправить'}
          </button>
        </form>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    boxSizing: 'border-box',
    padding: 24,
    background: '#f1f5f9',
    fontFamily: 'Arial, sans-serif',
  },
  chat: {
    maxWidth: 760,
    height: '85vh',
    minHeight: 400,
    margin: '0 auto',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: 12,
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 0',
  },
  message: {
    padding: '8px 12px',
    marginBottom: 10,
    background: '#f1f5f9',
    borderRadius: 10,
    overflowWrap: 'anywhere',
  },
  form: {
    display: 'flex',
    gap: 8,
    paddingTop: 12,
    borderTop: '1px solid #e2e8f0',
  },
  error: {
    color: '#dc2626',
  },
};
