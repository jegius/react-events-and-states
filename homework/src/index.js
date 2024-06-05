//Хранилище Redux обычно используется для обеспечения доступа к состоянию приложения через все компоненты. Для этого  оборачиваем приложение в компонент `Provider` из библиотеки `react-redux`, передавая ему свое хранилище в качестве пропса `store`. Теперь все дочерние компоненты `App` могут подключиться к Redux Store и получить доступ к состоянию приложения или отправить новые действия.
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <App />
  </Provider>,
);


