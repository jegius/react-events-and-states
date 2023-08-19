import './Start.css';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsStarted} from '../../store/selectors';
import {handleStartStop} from '../../store/thunks';

export function Start() {
    const isStarted = useSelector(selectIsStarted);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(handleStartStop(isStarted));
    }

    return (
        <button
            onClick={handleSubmit}
            className={`start-button ${isStarted ? 'stop' : 'start'}`}>
            {isStarted ? 'stop' : 'start'}
        </button>
    );
}