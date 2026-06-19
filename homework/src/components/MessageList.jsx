import MessageItem from './MessageItem';

export default function MessageList({ messages, currentUsername }) {
  if (messages.length === 0) {
    return (
      <div className="messages-list empty-list">
        Пока сообщений нет. Напишите первым.
      </div>
    );
  }

  return (
    <div className="messages-list">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          isOwnMessage={message.username === currentUsername}
        />
      ))}
    </div>
  );
}