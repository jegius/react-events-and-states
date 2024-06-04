import './App.css';
import {useContext} from 'react';

import {LoginStore} from './stores/login-store';
import {UserStore} from './stores/user-store';
import React from 'react';

import {VotesStore} from './stores/votes-store';
import {AppContent} from './components/AppContent/AppContent';

// Создаем сторы, чтобы они были singleton https://refactoring.guru/ru/design-patterns/singleton

const loginStore = new LoginStore();
const userStore = new UserStore();
const voteStore = new VotesStore();
const stores = {
  loginStore,
  userStore,
  voteStore,
};

// Для простоты использования сторов будем использовать контекст реакта
export const StoresContext = React.createContext(stores);

const App = () => {
  const stores = useContext(StoresContext);

  return (
    <StoresContext.Provider value={stores}>
      <AppContent />
    </StoresContext.Provider>
  );
};

export default App;
