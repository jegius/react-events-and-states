import { setUser, setMessages } from './chatSlice'

export const registerUser = async (dispatch, username, password) => {
    const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })

    if (response.ok) {
        dispatch(setUser({
            username: username,
            password: password
        }))
    }
}

export const loginUser = async (dispatch, user, username, password) => {
    const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })

    if (response.ok) {
        dispatch(setUser({
            username: username,
            password: password
        }))
    }

    const result = await response.json();
    localStorage.setItem('token', result.token);
    localStorage.setItem('username', username);

    checkToken(dispatch, user);
}

export const sendMessage = async (dispatch, message) => {
    const token = localStorage.getItem('token')

    await fetch('http://localhost:3001/chats', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({body: message})
    })

    fetchMassages(dispatch);
}

export const fetchMassages = async (dispatch) => {
    const token = localStorage.getItem('token')

    const response = await fetch('http://localhost:3001/chats', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    const result = await response.json();

    dispatch(setMessages(result));
}

export const checkToken = async (dispatch, user) => {
    const token = localStorage.getItem('token')
    if (token) {
        await fetch('http://localhost:3001/chats', {
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