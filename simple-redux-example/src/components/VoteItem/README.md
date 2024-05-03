[На главную](../../../README.md)

# Документация по компоненту `VoteItem`

## Описание

`VoteItem` - это функциональный компонент React, предназначенный для отображения голосующего пункта. Он позволяет удалять и голосовать за элементы.

## Imports

```jsx
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './VoteItem.css';
import {
    isSelected,
    selectIsCanVote,
    selectIsStarted,
    selectPercentByAll,
    selectUser,
    selectVotedCounterForItem
} from '../../store/selectors';
import {setCanVote, setError, setItems} from '../../store/actions';
```
- `React`: основная библиотека для создания компонентов.
- `useDispatch`, `useSelector`: хуки React-Redux.
- `./VoteItem.css`: CSS стили для компонента.
- Функции селекторы: необходимы для извлечения данных из Redux хранилища.
- `setCanVote`, `setError`, `setItems`: экшены, используемые для изменения состояния Redux.

## State и Redux

Компонент `VoteItem` использует глобальное состояние посредством хуков `useDispatch` и `useSelector` от Redux.

```jsx
const dispatch = useDispatch();
const isStarted = useSelector(selectIsStarted);
const isCanVote = useSelector(selectIsCanVote);
const percent = useSelector(store => selectPercentByAll(store, item));
const voteCount = useSelector(store => selectVotedCounterForItem(store, item.id));
const user = useSelector(selectUser);
const selected = useSelector(store => isSelected(store, item.id, user));
```
Компонент использует различные селекторы для получения статуса голосования, процента голосов за элемент, количества проголосовавших за элемент, текущего пользователя и выбора этого элемента.

## Обработка нажатий

### Удаление элемента

Если голосование не началось, компонент вернет кнопку, которая при нажатии будет удалять элемент.

```jsx
const remove = async () => {
    const response = await fetch(`http://localhost:3001/api/voteItems/${item.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const result = await response.json();

    dispatch(setItems(result));
};
```

### Голосование за элемент

Если голосование началось, компонент вернет кнопку, которая будет голосовать за элемент.

```jsx
const vote = async () => {
        const response = await fetch(`http://localhost:3001/api/voteItems/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Unique-Identifier': user
            },
        });
        const result = await response.json();
        dispatch(response.ok ? setItems(result) : setError(result));
        dispatch(setCanVote(false))

};
```

## Рендеринг компонента

```jsx
return (
    <div className={`vote ${selected ? '_selected' : ''}`}>
        <div className="vote__back-line" style={{right: `${- 100 + percent}%`}}></div>
        {!isStarted && <span className="vote__counter">{voteCount}</span>}
        <div className="vote__bubble">{item.name}</div>
        <button
            className={`button ${isStarted ? '' : 'remove'}`}
            onClick={isStarted ? vote : remove}
            disabled={!isCanVote && isStarted}
        >
            {isStarted ? 'Проголосовать' : 'Удалить'}
        </button>
    </div>
);
```

## Пример использования

```jsx
import React from 'react';
import { VoteItem } from './VoteItem';

const MockItem = {
    id: 1,
    name: "Item 1",
};

export const ExampleComponent = () => {
    return <VoteItem item={MockItem} />;
};
```

В этом примере компонент `VoteItem` получает `MockItem` в качестве свойства. Голосования и удаления будут связаны с `MockItem`.

## Обратите внимание

Все API-запросы в этом компоненте направлены на `http://localhost:3001/api/**`. Если ваш сервер работает на другом домене или порту, вам будет необходимо обновить эту настройку.