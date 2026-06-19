export default function MessageItem({ message, isOwnMessage }) {
  return (
    <article className={`message-item ${isOwnMessage ? 'own-message' : ''}`}>
      <div className="message-author">{message.username}</div>
      <div className="message-body">{message.body}</div>
    </article>
  );
}