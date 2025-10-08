import { useSelector, useDispatch } from "react-redux"
import { selectShowRegistration } from "../store/selectors"
import { selectFormType } from "../store/selectors";
import { loginUser, registerUser } from "../store/thunk";
import { setShowRegistration } from "../store/reducer"
import { useEffect } from "react";
import './Form.css'

// Основной компонент формы
export default function Form() {
    const dispatch = useDispatch();
    
    // Получаем из состояния redux, показывать ли форму и какой тип формы
    const showRegistration = useSelector(selectShowRegistration);
    const formType = useSelector(selectFormType);

    // Переменные для хранения значений полей формы
    var username = "";
    var password = "";
    var secondPassword = "";
    var validityTarget = null;

    // Эффект для закрытия формы при клике вне её области
    useEffect(()=>{
        const handleClickOutside = (ev) => {
            const form = document.querySelector('.form');
            // Если форма открыта и клик был вне формы, закрываем форму
            if (showRegistration && form && !form.contains(ev.target)) {
                dispatch(setShowRegistration(false));
            }
        }
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    },[ showRegistration ])

    // Обработчик отправки формы логина
    function loginFromSubmit(event){
        event.preventDefault();
        dispatch(setShowRegistration(false));
        console.log(username, password, "login submit")
        dispatch(loginUser(username, password));
    }

    // Обработчик отправки формы регистрации
    function registerFromSubmit(event){
        event.preventDefault();
        dispatch(setShowRegistration(false));
        console.log(username, password, "register submit")
        dispatch(registerUser(username, password));
    }

    // Проверка совпадения паролей при регистрации
    function validatePassword(){
        if (password !== secondPassword){
            validityTarget.setCustomValidity("Passwords don't match");
        } else {
            validityTarget.setCustomValidity("");
        }
    }

    // Если форма не должна отображаться, возвращаем пустой элемент
    if (!showRegistration) {return <></>}

    // Если тип формы - логин
    if (formType === 'login'){
        return  (
            <div className="wrapper">
                <form className="form" onSubmit={loginFromSubmit}>
                    <label htmlFor="username">Username:</label>
                    {/* Сохраняем значение при потере фокуса */}
                    <input onBlur={(ev) => username = ev.target.value} type="text" placeholder="Username" name="username" required />
                    <label htmlFor="password">Password:</label>
                    <input type="password" onBlur={(ev) => password = ev.target.value} placeholder="Password" name="password" required />
                    <button className="form__controls" type="submit">Login</button>
                    <button className="form__controls" type="button" onClick={() => dispatch(setShowRegistration(false))}>Cancel</button>
                </form>
            </div>
        )
    }
    // Если тип формы - регистрация
    else if (formType === 'register'){
        return  (
            <div className="wrapper">
                <form className="form" onSubmit={registerFromSubmit}>
                    <h2>Register</h2>
                    <div>
                        <label htmlFor="username">Username: </label>
                        {/* Сохраняем значение при потере фокуса */}
                        <input id="username" onBlur={(ev) => username = ev.target.value} type="text" placeholder="Username" name="username" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input id="password" onBlur={(ev) => password = ev.target.value} type="password" placeholder="Password" name="password" required />
                    </div>
                    <div>
                        <label htmlFor="repeatPassword">Repeat your password: </label>
                        {/* Проверяем совпадение паролей при потере фокуса */}
                        <input id="repeatPassword" onBlur={(ev) => {secondPassword = ev.target.value; validityTarget = ev.target; validatePassword()}} type="password" placeholder="Repeat password" name="repeatPassword" required />
                    </div>
                    <button className="form__controls" type="submit">Register</button>
                    <button className="form__controls" type="button" onClick={() => dispatch(setShowRegistration(false))}>Cancel</button>
                </form>
            </div>
        )
    }

    // Если ни один тип формы не выбран, возвращаем пустой элемент
    return <></>
}