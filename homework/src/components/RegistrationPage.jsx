import React, { useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/chatSlice'
import { selectUser } from '../store/selectors'
import { checkToken, registerUser, loginUser } from '../store/thunks'

export const RegistrationPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        registerUser(dispatch, inputUsername, inputPassword);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        loginUser(dispatch, user, inputUsername, inputPassword);
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
