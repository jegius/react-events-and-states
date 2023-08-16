import './Start.css';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsStarted} from '../../store/selectors';
import {fetchItems, handleStartStop} from '../../store/thunks';

export function Start() {
    const isStarted = useSelector(selectIsStarted);
    const dispatch = useDispatch();

    useEffect(() => {
        let newInterval;
        if (isStarted) {
            newInterval = setInterval(() => {
                dispatch(fetchItems());
            }, 500)
        }

        return () => {
            if (newInterval) {
                clearInterval(newInterval);
            }
        }
    }, [dispatch, isStarted]);

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