import React, { useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../store/chatSlice'
import { selectMessages } from '../store/selectors'
import { sendMessage } from '../store/thunks'


export const AddMessageForm = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        sendMessage(dispatch, inputValue);
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