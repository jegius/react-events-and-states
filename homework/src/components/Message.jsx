import React from "react";

const Message = React.forwardRef(({ message }, ref) => {  // ref позволяет устанавливать фокус на отправленном сообщении.
  return (
    <div ref={ref}>
      <p>{message.username}: {message.body}</p>
    </div>
  );
});

export default Message;