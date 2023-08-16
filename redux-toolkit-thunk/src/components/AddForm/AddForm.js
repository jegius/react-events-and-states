import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './AddForm.css';
import {Start} from '../Start/Start';
import {selectIsStarted} from '../../store/selectors';
import {postItem} from '../../store/thunks';
import {disableError} from '../helpers';

export function AddForm() {
    const dispatch = useDispatch();
    const isStarted = useSelector(selectIsStarted);
    const [item, setItem] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!item) {
            disableError(setError);
            return;
        }

        dispatch(postItem(item));
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