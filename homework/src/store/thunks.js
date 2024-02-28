import { useDispatch } from 'react-redux';
import { setUser } from './chatSlice'


export const checkToken = (dispatch, user) => {
    const token = localStorage.getItem('token')
    if (token) {
        fetch('http://localhost:3001/chats', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            if (response.ok) {
                dispatch(setUser({
                    ...user,
                    isAuthenticated: true,
                }));
            } else {
                dispatch(setUser({
                    ...user,
                    isAuthenticated: false,
                }));
            }
        })
        .catch((error) => {
            console.error('Error while checking token validity:', error);
            dispatch(setUser({
                ...user,
                isAuthenticated: false,
            }));
        });
    } else {
        dispatch(setUser({
            ...user,
            isAuthenticated: false,
        }));
    }
}