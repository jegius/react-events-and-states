import React, { useState } from 'react';
import {useDispatch } from 'react-redux';
import { sendMessage } from '../store/thunks'


export const AddMessageForm = ({onMessageSent}) => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        sendMessage(dispatch, inputValue);
        setInputValue('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <input
                    type="text" name="message" value={inputValue}
                    onChange={({target}) => setInputValue(target.value.trim())} />
            </label>
            <br /><br />
            <button type="submit">Отправить</button>
        </form>
    )
}