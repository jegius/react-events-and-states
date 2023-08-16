import './Start.css';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsStarted} from '../../store/selectors';
import {setItems, setStart} from '../../store/actions';

export function Start() {
    const isStarted = useSelector(selectIsStarted);
    const [poolingInterval, setPoolingInterval] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        clearInterval(poolingInterval);
        if (isStarted) {
            const newInterval = setInterval(async () => {
                const response = await fetch('http://localhost:3001/api/voteItems');
                const result = await response.json();
                dispatch(setItems(result));
            }, 200)
            setPoolingInterval(newInterval);
        } else {
            clearInterval(poolingInterval);
        }
    }, [dispatch, isStarted, poolingInterval])


    const handleSubmit = async () => {
        const partOfPath = isStarted ? 'stop' : 'start';
        const response = await fetch(`http://localhost:3001/api/${partOfPath}`);
        const result = await response.json();

        dispatch(setItems(result));
        dispatch(setStart(!isStarted));
    }

    return (
        <button
            onClick={handleSubmit}
            className={`start-button ${isStarted ? 'stop' : 'start'}`}>{isStarted ? 'stop' : 'start'}</button>
    );
}