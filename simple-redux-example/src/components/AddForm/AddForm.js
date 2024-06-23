import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setItems} from '../../store/actions';
import './AddForm.css';
import {Start} from '../Start/Start';
import {selectIsStarted} from '../../store/selectors';
import {disableError} from '../helpers';

export function AddForm() {
    const dispatch = useDispatch();
    const isStarted = useSelector(selectIsStarted);
    const [item, setItem] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!item) {
            disableError(setError);
            return;
        }

        const response = await fetch('http://localhost:3001/api/voteItems', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: item,
                votes: 0
            }),
        })
        const result = await response.json();

        dispatch(setItems(result));
        setItem('');
    };

    return (
        <div className="add-form__wrapper">
            {!isStarted && <form className="add-form" onSubmit={handleSubmit}>
                <input className={`input ${error}`} type="text" value={item}
                       onChange={({target}) => setItem(target.value.trim())}/>
                <button className="button" type="submit">Добавить на голосование</button>
            </form>}
            <Start/>
        </div>
    );
}