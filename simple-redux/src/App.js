import './App.css';
import {AddForm} from './components/AddForm/AddForm';
import {useDispatch, useSelector} from 'react-redux';
import {allVotes, selectAllVotedForItem, selectItems, selectUser} from './store/selectors';
import {VoteItem} from './components/VoteItem/VoteItem';
import {useEffect} from 'react';
import {setCanVote, setItems, setShowRegistration, setStart} from './store/actions';
import {Introduce} from './components/Introduce/Introduce';

function App() {
    const items = useSelector(selectItems);
    const user = useSelector(selectUser);
    const allVotedCounter = useSelector(allVotes);
    const dispatch = useDispatch();

    useEffect(() => {
        Promise.all([
                fetch('http://localhost:3001/api/voteItems'),
                fetch('http://localhost:3001/api/isStarted'),
                fetch(`http://localhost:3001/api/canVote/${user}`)
            ]
        ).then(responses => responses.map(response => response.json()))
            .then(async ([asyncVteItems, asyncIsStarted, isCanVote]) => {
                const items = await asyncVteItems;
                const isStarted = await asyncIsStarted;
                const canVote = await isCanVote;
                dispatch(setItems(items));
                dispatch(setStart(isStarted));
                dispatch(setCanVote(canVote))
            });
    }, [dispatch, user]);

    return (
        <>
            {user ?
                <div className="vote-root">
                    <AddForm/>
                    <div className="vote-root__full-counter">Всего голосов: {allVotedCounter}</div>
                    <div className="vote-root__items">
                        {items?.map(item => <VoteItem key={item.id} item={item}/>)}
                    </div>
                </div> : <div className="registration-error">
                    Невозможно принять участие без регистрации!
                    <button className="button" onClick={() => dispatch(setShowRegistration(true))}>Зарегистрироваться</button>
                </div>
            }
            <Introduce/>
        </>
    );
}

export default App;
