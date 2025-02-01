// src/components/Message.jsx
import React from 'react';

const Message = ({ username, body }) => {
  return (
    <div>
      <p>
        <strong>{username}:</strong> {body}
      </p>
    </div>
  );
};

export default Message;