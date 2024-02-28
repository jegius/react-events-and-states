import {useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/chatSlice';
import { selectUser } from '../store/selectors';
import { checkToken } from '../store/thunks'


export const ChatPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const handleLogout = async (e) => {
        localStorage.removeItem('token');
        checkToken(dispatch, user);
    }

    return (
        <div>
            <h1>Chat</h1>
            <p>Hello {localStorage.getItem('username')}</p>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    )
}