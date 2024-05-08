import {useState} from 'react';
import { redirect } from "react-router-dom";

const loginAction = () => { // Отправляем запрос на сервер
    return fetch('http://localhost:3001/chats', {
        header: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${'сохранённый токен'}`,
        },
    }).then((res) => {
        // код обработки ответа от сервера
    })
}

const useForm = () => {  // Пользовательский хук
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validateForm = () => { 
        const newError = {};
        if (!name) {
            newError.name = 'Name is required';
        } else if (password.length < 5 || !password.match(/[0-9!@#$%^&*]/)) {
            newError.password = 'Password should be at least 5 characters and contain numbers or special characters';
        } 
        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const onSubmitHandle = (event) => { // При нажатии на кнопку Register
        event.preventDefault();
        if (!validateForm()) { // Если валидация не прошла
            return;
        }
        // И если прошла успешно, то авторизовация на Swagger
        loginAction(name, password);
        redirect("/chat");

    }

    return { name, setName, password, setPassword, error, onSubmitHandle };
};

export const Login = () => { //Компонент с авторизацией
    const { name, setName, password, setPassword, error, onSubmitHandle } = useForm();

    return (
        <div className="wrapper">
            <div className="form-container">
                <h1 className="title">LOG IN!</h1>
                <form onSubmit={onSubmitHandle}> 
                    <div className="form-container_item">
                        <input type="text" name="name" placeholder="Enter your login" className="input"
                            onChange={(e) => setName(e.target.value)} value={name}/>
                        {error.name && <div className="error-message">{error.name}</div>}
                    </div>

                    <div className="form-container_item">
                        <input type="password" name="password" placeholder="Password" className="input"
                            onChange={(e) => setPassword(e.target.value)} value={password}/>
                        {error.password && <div className="error-message">{error.password}</div>}
                    </div>

                    <button className="button" type="submit">Log in</button>
                </form>
            </div>
        </div>
    );
};

