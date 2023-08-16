import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './VoteItem.css';
import {
    isSelected,
    selectIsCanVote,
    selectIsStarted,
    selectPercentByAll,
    selectUser,
    selectVotedCounterForItem
} from '../../store/selectors';
import {setCanVote, setError, setItems} from '../../store/actions';

export function VoteItem({item}) {
    const dispatch = useDispatch();
    const isStarted = useSelector(selectIsStarted);
    const isCanVote = useSelector(selectIsCanVote);
    const percent = useSelector(store => selectPercentByAll(store, item));
    const voteCount = useSelector(store => selectVotedCounterForItem(store, item.id));
    const user = useSelector(selectUser);
    const selected = useSelector(store => isSelected(store, item.id, user));

    const remove = async () => {
        const response = await fetch(`http://localhost:3001/api/voteItems/${item.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();

        dispatch(setItems(result));
    };

    const vote = async () => {
            const response = await fetch(`http://localhost:3001/api/voteItems/${item.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Unique-Identifier': user
                },
            });
            const result = await response.json();
            dispatch(response.ok ? setItems(result) : setError(result));
            dispatch(setCanVote(false))

    };

    return (
        <div className={`vote ${selected ? '_selected' : ''}`}>
            <div className="vote__back-line" style={{right: `${- 100 + percent}%`}}></div>
            {!isStarted && <span className="vote__counter">{voteCount}</span>}
            <div className="vote__bubble">{item.name}</div>
            <button
                className={`button ${isStarted ? '' : 'remove'}`}
                onClick={isStarted ? vote : remove}
                disabled={!isCanVote && isStarted}
            >
                {isStarted ? 'Проголосовать' : 'Удалить'}
            </button>
        </div>
    );
}