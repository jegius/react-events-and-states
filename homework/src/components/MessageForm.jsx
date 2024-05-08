import React, { useState } from "react";

export const MessageForm = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="messageFormContainer">     
        <div>
            <input
                className="input"
                type="text"
                placeholder="Enter your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
        </div>
        <button className="button" type="submit">Send</button>
      </div>
    </form>
  );
};
