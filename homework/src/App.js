import MessagesBox from './components/MessagesBox';
import TopBar from './components/TopBar';
import Form from './components/Form';
import BottomBar from './components/BottomBar';
import './App.css';

import { fetchMessages } from './store/thunk';
import { useSelector, useDispatch } from 'react-redux';
import { selectToken, selectMessages } from './store/selectors';
import { setShowRegistration, setToken, setUser, setFormType } from './store/reducer';
import { useEffect } from 'react';

function App() {
  // Получение dispatch-функции из Redux
  const dispatch = useDispatch();

  // Получение токена и сообщений из хранилища
  const token = useSelector(selectToken)
  const loadedMessages = useSelector(selectMessages)

  // Эффект для периодической загрузки новых сообщений, если есть токен
  useEffect(() => {
    if (token) {
      const newInterval = setInterval(() => {
        console.log("Checking for new messages...");
        dispatch(fetchMessages(token, loadedMessages));
      }, 1500);

      // Очистка интервала при размонтировании компонента или изменении токена
      return () => {
        if (newInterval) {
          clearInterval(newInterval);
        }
      }
    }
  }, [token])

  // Проверка наличия данных пользователя в localStorage и их загрузка
  function checkReload() {
    console.log('Проверка перезагрузки')
    if (localStorage.getItem('username') && localStorage.getItem('token')){
      dispatch(setToken(localStorage.getItem('token')))
      dispatch(setUser({username: localStorage.getItem('username'), password: localStorage.getItem('password')}))
      dispatch(fetchMessages(localStorage.getItem('token'), loadedMessages))
    }
  }

  // Открытие формы регистрации
  function register() {
    dispatch(setShowRegistration(true))
    dispatch(setFormType('register'))
  }

  // Открытие формы входа
  function login() {
    dispatch(setShowRegistration(true))
    dispatch(setFormType('login'))
  }

  // Выход пользователя и очистка данных
  function logout() {
    dispatch(setUser({username: null, password: null}))
    dispatch(setToken(null))
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }

  // Эффект для проверки данных пользователя при первом рендере
  useEffect(() => {
    checkReload()
  }, [])

  // Проверка авторизации пользователя
  const isAuthenticated = !!token || !!localStorage.getItem('token');

  // Рендер компонента в зависимости от авторизации
  return (
    <>
      {isAuthenticated ? (
        <div className="App">
          <TopBar logout={logout} />
          <MessagesBox />
          <BottomBar />
        </div>
      ) : (
        <div>
          <div>Для использования чата необходимо войти в систему</div>
          <button onClick={login}>Войти</button>
          <button onClick={register}>Зарегистрироваться</button>
          <Form />
        </div>
      )}
    </>
  );
}

export default App;
