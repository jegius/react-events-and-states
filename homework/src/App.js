import logo from './logo.svg';
import './App.css';
import { RegistrationPage } from './components/RegistrationPage';
import {useDispatch, useSelector} from 'react-redux';
import { selectUser } from './store/selectors';

function App() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch();

    return (
        <RegistrationPage />
    );
}

export default App;
