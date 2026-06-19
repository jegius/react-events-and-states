import { VirtualScrollProvider } from '../context/VirtualScrollContext';
import MessageItem from './MessageItem';
import VirtualScroll from './VirtualScroll';

export default function MessageList({ messages, currentUsername }) {
  if (messages.length === 0) {
    return (
      <div className="messages-list empty-list">
        Пока сообщений нет. Напишите первым.
      </div>
    );
  }

  return (
    <VirtualScrollProvider itemHeight={82} overscan={6}>
      <VirtualScroll
        className="messages-list"
        items={messages}
        getKey={(message) => message.id}
        scrollToBottomOnItemsChange
        renderItem={(message) => (
          <MessageItem
            message={message}
            isOwnMessage={message.username === currentUsername}
          />
        )}
      />
    </VirtualScrollProvider>
  );
}