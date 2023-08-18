[На главную](../../../README.md)

# `Introduce`

## Описание

`Introduce` - это функциональный компонент React, предназначенный для отображения формы регистрации пользователя.

## Imports

```jsx
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectShowRegistration, selectUser} from '../../store/selectors';
import {setShowRegistration, setUser} from '../../store/actions';
import {disableError} from '../helpers';
import './Introduce.css';
```

- `React`, `useState`: необходимы для создания компонента.
- `useDispatch`, `useSelector`: средства Redux для работы с глобальным состоянием и диспетчеризации действий.
- `selectShowRegistration`, `selectUser`: селекторы для получения состояния регистрации и данных пользователя из хранилища Redux.
- `setShowRegistration`, `setUser`: действия для установки состояния регистрации и данных пользователя в хранилище Redux.
- `disableError`: вспомогательная функция для управления ошибками.
- `./Introduce.css`: стили для компонента.

## State и Redux

Компонент `Introduce` использует как локальное состояние React (`useState`), так и состояние Redux (`useSelector`, `useDispatch`):

```jsx
const dispatch = useDispatch();
const [inputValue, setInputValue] = useState('');
const [error, setError] = useState('');
const user = useSelector(selectUser);
const showRegistration = useSelector(selectShowRegistration);
```

- `dispatch` - функция Redux, позволяющая компоненту отправлять экшены в стор.
- `inputValue` и `setInputValue` - состояние и функция установки состояния для значения ввода формы.
- `error` и `setError` - состояние и функция установки состояния для отображения ошибки.
- `user` - текущий зарегистрированный пользователь.
- `showRegistration` - флаг, показывающий, следует ли отображать форму регистрации.

## Обрабатывание отправки формы

```jsx
const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputValue) {
        disableError(setError);
        return;
    }

    dispatch(setUser(inputValue));
    dispatch(setShowRegistration(false));
    
    setInputValue('');
};
```

Функция `handleSubmit` предотвращает стандартную отправку формы, затем проверяет, не пустое ли поле ввода. Если поле ввода пустое, функция вызывает `disableError`. Если поле ввода не пустое, функция диспетчеризует действия `setUser` и `setShowRegistration`, устанавливая имя пользователя и пряча форму регистрации.

## Рендеринг компонента

```jsx
return <>
    {!user && showRegistration &&
    ...
    };
</>
```

Компонент отображает форму только если пользователь еще не зарегистрирован и требуется показать форму регистрации. Форма содержит поле ввода имени и две кнопки: одна для отправки формы, другая для отмены регистрации.

### Пример использования

```jsx
import React from 'react';
import Introduce from './Introduce.js';

export const ExampleComponent = () => {
  return <Introduce />;
}
```

В этом примере компонент `Introduce` будет использовать состояние из Redux Store вашего приложения для его отображения и поведения.

## Обратите внимание

Все API-запросы в этом компоненте направлены на `http://localhost:3001/api/**`. Если ваш сервер работает на другом домене или порту, вам будет необходимо обновить эту настройку.