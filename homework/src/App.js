import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Register from './components/Register';
import Login from './components/Login';
import Chat from './components/Chat';

function App() {
  const user = useSelector((state) => state.user.username);
  const [authMode, setAuthMode] = useState('register');

  if (user) {
    return (
      <div 
        className="App" 
        style={{ 
          maxWidth: 800, 
          margin: '0 auto', 
          padding: 20, 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
        }}
      >
        <header style={{ textAlign: 'center' }}>
          <h1 style={{ margin: 0 }}>Глобальный Чат</h1>
        </header>
        <main style={{ flexGrow: 1, overflow: 'hidden' }}>
          <Chat />
        </main>
      </div>
    );
  }

  return (
    <div className="App" style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <header style={{ textAlign: 'center' }}>
        <h1 style={{ margin: 0 }}>Глобальный Чат</h1>
      </header>
      <main>
        {authMode === 'register' && <Register onSwitchToLogin={() => setAuthMode('login')} />}
        {authMode === 'login' && <Login onLoginSuccess={() => {}} onSwitchToRegister={() => setAuthMode('register')} />}
      </main>
    </div>
  );
}

export default App;