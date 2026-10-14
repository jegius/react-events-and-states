import { useSelector } from "react-redux";
import AuthPage from "./features/auth/AuthPage";
import ChatPage from "./features/chat/ChatPage";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <ChatPage /> : <AuthPage />;
}

export default App;
