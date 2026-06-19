import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../features/chat/chatSlice';

export default function MessageInput() {
  const dispatch = useDispatch();
  const sendStatus = useSelector((state) => state.chat.sendStatus);

  const [message, setMessage] = useState('');

  const isSending = sendStatus === 'loading';

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isSending) {
      return;
    }

    try {
      await dispatch(sendMessage(trimmedMessage)).unwrap();
      setMessage('');
    } catch {
      // Ошибка уже сохраняется в Redux slice
    }
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Введите сообщение..."
      />

      <button type="submit" disabled={isSending || !message.trim()}>
        {isSending ? 'Отправка...' : 'Отправить'}
      </button>
    </form>
  );
}