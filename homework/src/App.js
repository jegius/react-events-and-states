import logo from './logo.svg';
import './App.css';
import { RegistrationPage } from './components/RegistrationPage';
import { ChatPage } from './components/ChatPage';
import {useDispatch, useSelector} from 'react-redux';
import { selectUser } from './store/selectors';

function App() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch();

    return (
        <>
            {!user.isAuthenticated ? <RegistrationPage/> : <ChatPage/> }
        </>
    );
}

export default App;
