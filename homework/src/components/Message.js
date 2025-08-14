import React from 'react';
import * as styles from '../styles';

const Message = ({ message, own }) => {
  const { username = 'User', body } = message;
  return (
    <div
      style={{
        ...(own ? styles.messageOwn : styles.messageOther),
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '70%',
        wordBreak: 'break-word',
        overflowWrap: 'break-word',
      }}
      role="listitem"
      aria-label={`${username}: ${body}`}
    >
      <strong style={styles.nicknameStyle}>{username}:</strong>
      <span>{body}</span>
    </div>
  );
};

export default Message;