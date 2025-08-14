import React, { forwardRef, useImperativeHandle, useRef, useCallback } from 'react';
import { VariableSizeList as List } from 'react-window';
import Message from './Message';
import { estimateMessageHeight } from '../styles';

const VirtualizedMessageList = forwardRef((
  {
    messages = [],
    height = 0,
    itemHeight = 0,
    width = '100%',
    onScroll,
    currentUsername,
  },
  ref
) => {
  const listRef = useRef();

  const getItemSize = useCallback((index) => {
    const message = messages[index];
    return message ? estimateMessageHeight(message.body) : itemHeight; 
  }, [messages, itemHeight]);

  useImperativeHandle(
    ref,
    () => ({
      scrollToBottom: () => {
        if (listRef.current) {
          listRef.current.scrollToItem(messages.length - 1, 'end');
        }
      },
      getItemSize,
    }),
    [messages.length]
  );

  const Row = React.memo(({ index, style }) => {
    const message = messages[index];
    const own = message.username === currentUsername;
    return (
      <div style={{
        ...style,
        display: 'flex',
        justifyContent: own ? 'flex-end' : 'flex-start',
        boxSizing: 'border-box',
      }}>
        <Message message={message} own={own} />
      </div>
    );
  });

  return (
    <List
      ref={listRef}
      height={height}
      itemCount={messages.length}
      itemSize={getItemSize}
      width={width}
      style={{ overflowX: 'hidden', willChange: 'transform' }}
      onScroll={onScroll}
    >
      {Row}
    </List>
  );
});

export default React.memo(VirtualizedMessageList);