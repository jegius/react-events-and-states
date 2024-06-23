[На главную](../../../README.md)

# `AddForm`

## Описание

`AddForm` - это функциональный компонент React, предназначенный для отображения формы добавления новых элементов для голосования.

## Импорты

```jsx
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setItems} from '../../store/actions';
import './AddForm.css';
import {Start} from '../Start/Start';
import {selectIsStarted} from '../../store/selectors';
import {disableError} from '../helpers';
```

- `React`, `useState`: необходимы для создания компонента и работы с его внутренним состоянием.
- `useDispatch`, `useSelector`: средства Redux для взаимодействия с глобальным состоянием приложения.
- `{setItems}`: экшн для обновления списка элементов в истории Redux.
- `./AddForm.css`: стили для компонента `AddForm`.
- `{Start}`: компонент кнопки старта голосования.
- `{selectIsStarted}`: селектор Redux для проверки, начато ли голосование.
- `{disableError}`: вспомогательная функция для управления ошибками.

## Внутреннее состояние и взаимодействие с Redux

```jsx
const dispatch = useDispatch();
const isStarted = useSelector(selectIsStarted);
const [item, setItem] = useState('');
const [error, setError] = useState('');
```

- `dispatch`: функция Redux для отправки действий.
- `isStarted`: значение, указывающее, началось ли голосование; получено из Redux.
- `item`: текущее значение поля ввода формы.
- `error`: сообщение об ошибке; пустое в начальном состоянии.

## Функция отправки формы

```jsx
const handleSubmit = async (event) => {
    event.preventDefault();

    if (!item) {
        disableError(setError);
        return;
    }

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
    setItem('');
};
```

Функция `handleSubmit` обрабатывает отправку формы. Она предотвращает стандартную отправку формы, затем проверяет, не пустое ли поле ввода. Если поле ввода пустое, она вызывает функцию `disableError` и ничего не делает.
Если поле ввода не пустое, функция отправляет пост-запрос на сервер с данными формы. Из полученного ответа с сервера обновляет состояние с помощью экшена `setItems` и сбрасывает поле ввода.

## Рендеринг компонента

```jsx
return (
    <div className="add-form__wrapper">
        {!isStarted && <form className="add-form" onSubmit={handleSubmit}>
            <input className={`input ${error}`} type="text" value={item}
                   onChange={({target}) => setItem(target.value.trim())}/>
            <button className="button" type="submit">Добавить на голосование</button>
        </form>}
        <Start/>
    </div>
);
```

Компонент возвращает div-контейнер, содержащий форму добавления (если голосование еще не начато), и компонент `Start`. Форма содержит поле ввода и кнопку отправки.

### Пример использования

```jsx
import React from 'react';
import AddForm from './AddForm.js';

export const ExampleComponent = () => {
  return <AddForm />;
}
```

В этом примере компонент `AddForm` будет использовать состояние из Redux Store вашего приложения для отображения соответствующего пользователю состояния.

## Обратите внимание

Все API-запросы в этом компоненте направлены на `http://localhost:3001/api/**`. Если ваш сервер работает на другом домене или порту, вам будет необходимо обновить эту настройку.