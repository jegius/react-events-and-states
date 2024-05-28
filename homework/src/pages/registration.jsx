import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const registrationAction = async (username, password) => { // Отправляем запрос на сервер
    
    const data = {
        username,
        password
    };

    const res = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (res.ok) {
        return res.json();
    } else {
        return await Promise.reject(res.status);
    }
}

const useForm = () => {  // Пользовательский хук
    const nagitation = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});

    const validateForm = () => { 
        const newError = {};
        if (!username) {
            newError.username = 'Name is required';
        } else if (password.length < 5 || !password.match(/[0-9!@#$%^&*]/)) {
            newError.password = 'Password should be at least 5 characters and contain numbers or special characters';
        } 
        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const onSubmitHandle = (event) => {
        event.preventDefault(); // Отмена перезагрузки
        if (!validateForm()) { // Если валидация не прошла
          return;
        }
      
        registrationAction(username, password)
            .then((res) => {
                if (res.message === 'Registered successfully') {
                    nagitation('/login');
                } 
            })
            .catch ((error) => { //если ошибка, выводим её в консоль
                if (error === 400) {
                    alert("User already exist. Please log in!");
                    nagitation('/login');
                }
            }); 
      };
      

    return { username, setUserName, password, setPassword, error, onSubmitHandle };
};

export const Registration = () => { //Компонент с регистрацией
    const { username, setUserName, password, setPassword, error, onSubmitHandle } = useForm();

    return (
        <div className="wrapper">
            <div className="form-container">
                <h1 className="title">Please register to start!</h1>
                <form onSubmit={onSubmitHandle}> 
                    <div className="form-container_item">
                        <input type="text" name="username" placeholder="Enter your login" className="input"
                            onChange={(e) => setUserName(e.target.value)} value={username}/>
                        {error.username && <div className="error-message">{error.username}</div>}
                    </div>

                    <div className="form-container_item">
                        <input type="password" name="password" placeholder="Password" className="input"
                            onChange={(e) => setPassword(e.target.value)} value={password}/>
                        {error.password && <div className="error-message">{error.password}</div>}
                    </div>

                    <button className="button" type="submit">Register</button>

                </form>
            </div>
        </div>
    );
};

