import './App.css';
import {AddForm} from './components/AddForm/AddForm';
import {useDispatch, useSelector} from 'react-redux';
import {allVotes, selectItems, selectUser} from './store/selectors';
import {VoteItem} from './components/VoteItem/VoteItem';
import {useEffect} from 'react';
import {Introduce} from './components/Introduce/Introduce';
import {fetchData} from './store/thunks';
import {setShowRegistration} from './store/votingSlice';

function App() {
    const items = useSelector(selectItems);
    const user = useSelector(selectUser);
    const allVotedCounter = useSelector(allVotes);
    const dispatch = useDispatch();

    useEffect(() => {
        const newInterval = setInterval(async () => {
            dispatch(fetchData(user))
        }, 500);

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
                    <button className="button"
                            onClick={() => dispatch(setShowRegistration(true))}>Зарегистрироваться</button>
                </div>
            }
            <Introduce/>
        </>
    );
}

export default App;
