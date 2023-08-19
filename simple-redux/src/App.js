import './App.css';
import {AddForm} from './components/AddForm/AddForm';
import {useDispatch, useSelector} from 'react-redux';
import {allVotes, selectItems, selectUser} from './store/selectors';
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
        const newInterval = setInterval(async () => {
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
        }, 500)

        return () => {
            if (newInterval) {
                clearInterval(newInterval);
            }
        }
    }, [dispatch, user])

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
