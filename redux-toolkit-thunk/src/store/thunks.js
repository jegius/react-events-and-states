import {setCanVote, setError, setItems, setStart} from './votingSlice';

export const postItem = (item) => async dispatch => {
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
};

export const fetchItems = () => async dispatch => {
    const response = await fetch('http://localhost:3001/api/voteItems');
    const result = await response.json();
    dispatch(setItems(result));
};

export const handleStartStop = (isStarted) => async dispatch => {
    const partOfPath = isStarted ? 'stop' : 'start';
    const response = await fetch(`http://localhost:3001/api/${partOfPath}`);
    const result = await response.json();
    dispatch(setItems(result));
    dispatch(setStart(!isStarted));
};

export const removeItem = (id) => async dispatch => {
    const response = await fetch(`http://localhost:3001/api/voteItems/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const result = await response.json();

    dispatch(setItems(result));
};

export const voteItem = (id, user) => async dispatch => {
    const response = await fetch(`http://localhost:3001/api/voteItems/${id}`, {
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

export const fetchData = (user) => async dispatch => {
    const response = Promise.all([
            fetch('http://localhost:3001/api/voteItems'),
            fetch('http://localhost:3001/api/isStarted'),
            fetch(`http://localhost:3001/api/canVote/${user}`)
        ]
    );
    const [items, isStarted, canVote] = (await response).map(response => response.json());
    dispatch(setItems(await items));
    dispatch(setStart(await isStarted));
    dispatch(setCanVote(await canVote))
};