import { useSelector } from 'react-redux';
import './App.css';
import AuthPage from './components/AuthPage';
import ChatPage from './components/ChatPage';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <ChatPage /> : <AuthPage />;
}

export default App;