import React from "react";
import "./Form.css"

const Message = ({ username, body }) => {
  return (
    <div className="message">
      <strong>{username}: </strong>
      <span>{body}</span>
    </div>
  );
};

export default Message;