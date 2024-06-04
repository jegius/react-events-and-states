import { MessageForm } from "../components/MessageForm";
import { MessageList } from "../components/MessageList";


export const ChatPage = () => {
  return (
    <>
      <div className="chat-wrapper">
        <h1 className="title">Global Chat</h1>
        <MessageList />
        <MessageForm />
      </div>
    </>
  );
};


