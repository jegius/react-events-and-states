import {useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/chatSlice'
import { selectUser } from '../store/selectors'


export const ChatPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const handleLogout = async (e) => {
        dispatch(setUser({
            ...user,
            isAuthenticated: false
        }))
    }

    return (
        <div>
            <h1>Chat</h1>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    )
}