// import { useDispatch } from 'react-redux'; // Хуки Redux для работы с глобальным состоянием
// import { setShowRegistration } from '../store/actions'; // Действия Redux
import { LinkButton } from "../components/LinkButton";

export const MainPage = () => {
    // const dispatch = useDispatch();

    // const handleShowRegistration = () => {
    //     dispatch(setShowRegistration(true));
    // };

    return (
        <div className="wrapper">
                <div className="registration-error">
                    <h1 className="title">It's impossible to use a chat without registration!</h1>
                    <LinkButton to="registration" title="Sign in" />
                    <p className="title-description">Already have an account? <a href='/login'>Log in!</a></p>
                </div>
        </div>
    );
}

