import {useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../store/selectors';
import { checkToken } from '../store/thunks'
import { AddMessageForm } from './AddMessageForm'
import { Chat } from './Chat'


export const ChatPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const handleLogout = async (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        checkToken(dispatch, user);
    }

    return (
        <div>
            <button onClick={handleLogout}>Выйти</button>
            <h1>Chat</h1>
            <div>
                <Chat/>
            </div>
            <div>
                <AddMessageForm/>
            </div>
        </div>
    )
}