[На главную](../../../README.md)

# `Start`

## Описание

`Start` - это функциональный компонент React, предназначенный для отображения кнопки, которая начинает или останавливает определенный процесс.

## Imports

```jsx
import './Start.css';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsStarted} from '../../store/selectors';
import {setItems, setStart} from '../../store/actions';
```

- `React`, `useEffect`: необходимы для создания компонента и запуска функций с эффектами побочного результата.
- `useDispatch`, `useSelector`: средства Redux для работы с глобальным состоянием и диспетчеризации действий.
- `selectIsStarted`: селектор для проверки, был ли процесс уже запущен в хранилище Redux.
- `setItems`, `setStart`: действия для установки элементов и изменения статуса процесса в хранилище Redux.
- `./Start.css`: стили для компонента.

## State и Redux

Компонент `Start` использует состояние Redux (`useSelector`, `useDispatch`):

```jsx
const isStarted = useSelector(selectIsStarted);
const dispatch = useDispatch();
```

- `isStarted` - текущий статус процесса.
- `dispatch` - функция Redux, позволяющая компоненту отправлять экшены в стор.

## Обработка побочных эффектов

```jsx
useEffect(() => {
    let newInterval;
    if (isStarted) {
        newInterval = setInterval(async () => {
            const response = await fetch('http://localhost:3001/api/voteItems');
            const result = await response.json();
            dispatch(setItems(result));
        }, 500)
    }

    return () => {
        if (newInterval) {
            clearInterval(newInterval);
        }
    }
}, [dispatch, isStarted])
```

Эффект выполняется при каждом обновлении компонента и при его размонтировании. Если процесс начат (`isStarted`), будет выполняться асинхронный запрос к серверу каждые 500 мс и обновляться состояние элементов в хранилище. При размонтировании компонента или при следующем рендере (если `isStarted` поменялся), интервал будет очищен.

## Обработка нажатия на кнопку

```jsx
const handleSubmit = async () => {
    const partOfPath = isStarted ? 'stop' : 'start';
    const response = await fetch(`http://localhost:3001/api/${partOfPath}`);
    const result = await response.json();

    dispatch(setItems(result));
    dispatch(setStart(!isStarted));
}
```

Функция `handleSubmit` выполняет асинхронный запрос к серверу и обновляет состояние элементов и статуса в хранилище.

## Рендеринг компонента

```jsx
return (
    <button
        onClick={handleSubmit}
        className={`start-button ${isStarted ? 'stop' : 'start'}`}>
        {isStarted ? 'stop' : 'start'}
    </button>
);
```

Компонент возвращает кнопку, которая при нажатии вызывает функцию `handleSubmit`. Ее стиль и текст изменяются в зависимости от текущего состояния процесса.

### Пример использования

```jsx
import React from 'react';
import Start from './Start.js';

export const ExampleComponent = () => {
  return <Start />;
}
```

В этом примере компонент `Start` будет использоваться с состоянием из Redux Store вашего приложения и начинать или останавливать процесс при нажатии.

## Обратите внимание

Все API-запросы в этом компоненте направлены на `http://localhost:3001/api/**`. Если ваш сервер работает на другом домене или порту, вам будет необходимо обновить эту настройку.