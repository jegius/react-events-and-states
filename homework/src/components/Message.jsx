import React from "react";

const Message = ({ message }) => {
  return (
    <div>
      <p>{message.username}: {message.text}</p>
    </div>
  );
};

export default Message;
