import logo from './logo.svg';
import './App.css';
import { RegistrationPage } from './components/RegistrationPage';
import { ChatPage } from './components/ChatPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './store/selectors';
import { setUser } from './store/chatSlice'
import { checkToken } from './store/thunks'

function App() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch();

    useEffect(() => {
        setUser({username: localStorage.getItem('username')});
        checkToken(dispatch, user);
    }, [])

    return (
        <>
            {user.isAuthenticated ? <ChatPage/> : <RegistrationPage/> }
        </>
    );
}

export default App;
