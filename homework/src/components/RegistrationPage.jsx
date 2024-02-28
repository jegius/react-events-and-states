import React, { useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/chatSlice'
import { selectUser } from '../store/selectors'
import { checkToken } from '../store/thunks'

export const RegistrationPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: inputUsername,
                password: inputPassword
            })
        })

        if (response.ok) {
            dispatch(setUser({
                username: inputUsername,
                password: inputPassword
            }))
        }

        const result = await response.json();
        console.log(result)
        console.log(user)
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: inputUsername,
                password: inputPassword
            })
        })

        const result = await response.json();
        localStorage.setItem('token', result.token);
        checkToken(dispatch, user);
        console.log(result)
        console.log(user)
    }

    return (
        <div>
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Логин:
                    <input
                        type="text" name="username" value={inputUsername}
                        onChange={({target}) => setInputUsername(target.value.trim())} />
                </label>
                <br />
                <label>
                    Пароль:
                    <input
                        type="password" name="password" value={inputPassword}
                        onChange={({target}) => setInputPassword(target.value.trim())} />
                </label>
                <br /><br />
                <button type="submit">Зарегистрироваться</button>
                <button onClick={handleLogin}>Войти</button>
            </form>
        </div>
    );
};
