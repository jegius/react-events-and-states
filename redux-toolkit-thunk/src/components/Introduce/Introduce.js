import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectShowRegistration, selectUser} from '../../store/selectors';
import {disableError} from '../helpers';
import './Introduce.css';
import {setShowRegistration, setUser} from '../../store/votingSlice';


export function Introduce() {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const user = useSelector(selectUser);
    const showRegistration = useSelector(selectShowRegistration);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!inputValue) {
            disableError(setError);
            return;
        }

        dispatch(setUser(inputValue));
        dispatch(setShowRegistration(false));

        setInputValue('');
    };

    return <>
        {!user && showRegistration &&
            <div className="wrapper">
                <form className="introduce-form" onSubmit={handleSubmit}>
                    <label htmlFor="name" className="input__label">
                        Ваше имя:
                        <input className={`input ${error}`} name="user" type="text" value={inputValue}
                               onChange={({target}) => setInputValue(target.value.trim())}/>
                    </label>
                    <div className="introduce-form__controls">
                        <button className="button" type="submit">Представиться</button>
                        <button className="button cancel" onClick={() => dispatch(setShowRegistration(false))}>Отмена</button>
                    </div>
                </form>
            </div>
        }
    </>;
}