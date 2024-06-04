import React from "react";

const Message = React.forwardRef(({ message }, ref) => {
  return (
    <div ref={ref}>
      <p>{message.username}: {message.body}</p>
    </div>
  );
});

export default Message;