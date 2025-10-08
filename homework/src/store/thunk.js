import { setUser, setToken, setMessages } from "./reducer.js"



// Регистрация пользователя
export function registerUser(name, password) {
    return async dispatch => {
        const responce = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": name,
                "password": password,
            })
        })
        console.log(responce)
        // После регистрации сразу выполняем вход
        dispatch(loginUser(name, password))
    }
}

// Вход пользователя
export function loginUser(name, password) {
    return async dispatch => {
        console.log(name, password)
        const responce = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": name,
                "password": password,
            })
        })
        const responceData = await responce.json()
        // Сохраняем пользователя и токен в store
        dispatch(setUser({
            username: name,
            password: password
        }))
        dispatch(setToken(responceData.token))
        // Сохраняем данные пользователя в localStorage
        localStorage.setItem('username', name)
        localStorage.setItem('token', responceData.token)
        localStorage.setItem('password', password)
    }
}

// Получение сообщений
export function fetchMessages(token, savedMessages) {
    if (token) {
        return async dispatch => {
            const responce = await fetch('http://localhost:3001/chats', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer: ${token}`
                },
            })
            const responceData = await responce.json()
            console.log('Fetched messages:', responceData)
            // Если количество сообщений изменилось, обновляем store
            if (responceData.length !== savedMessages.length){
                console.log('Messages updated:', responceData);
                dispatch(setMessages(responceData))
            }
            else {
                console.log('No new messages');
            }
        }
    }
    else {
        // Если токена нет, ничего не делаем
        return async dispatch => {}
    }
}

// Отправка сообщения
export function sendMessage(token, text) {
    return async dispatch => {
        const responce = await fetch('http://localhost:3001/chats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer: ${token}`
            },
            body: JSON.stringify({
                "body": text,
            })
        })
        const responceData = await responce.json()
        console.log(responceData)
    }
}