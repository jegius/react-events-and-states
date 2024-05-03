import './App.css'; // Стили для компонента App
import { useDispatch, useSelector } from 'react-redux'; // Хуки Redux для работы с глобальным состоянием
import { selectUser, selectShowRegistration } from './store/selectors'; // Селекторы Redux для выбора состояния
import { setShowRegistration } from './store/actions'; // Действия Redux
import ChatPage from './pages/chatPage'; // Компонент для чата
import Registration from './pages/registration'; // Компонент для регистрации

function App() {
    const user = useSelector(selectUser);
    const showRegistration = useSelector(selectShowRegistration);
    const dispatch = useDispatch();

    const handleShowRegistration = () => {
        dispatch(setShowRegistration(true));
    };

    return (
        <div className="wrapper">
            {user ?
                <div>
                    <ChatPage />
                </div> : <div className="registration-error">
                    <h1 className="title">Невозможно принять участие в чате без регистрации!</h1>
                    <button className="button" onClick={handleShowRegistration}>Зарегистрироваться</button>
                </div>
            }
            {showRegistration && <Registration />}
        </div>
    );
}

export default App;
