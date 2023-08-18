[На главную](../../../README.md)

## Содержание
- [Redux Selectors](#Redux-Selectors)
- [Redux Store](#Redux-Store)
- [Redux Thunk](#Редакс-Thunk)
- [Redux Toolkit Slice](#Redux-Toolkit-Slice)


# Redux Selectors

Селекторы позволяют выбирать некоторые данные из хранилища Redux и использовать их в React компонентах. Например, `selectItems(store)` получает все элементы из списка `items`.

По аналогии, остальные селекторы `selectIsStarted`, `selectUser`, `selectShowRegistration` и `selectIsCanVote` используются для выбора соответствующих значений из Redux Store.

Кроме того, есть некоторые сложные селекторы, которые используют функции с многими аргументами для выбора элементов или вычисления дополнительных данных.

Например, `selectAllVotedForItem(store, itemId)` возвращает все элементы, проголосовавшие за конкретный элемент, `isSelected(store, itemId, user)` возвращает `true`, если указанный пользователь уже голосовал за этот элемент, `allVotes(store)` подсчитывает общее число голосов, `selectPercentByAll(store, {voted})` вычисляет процент голосов за конкретный элемент по отношению ко всем голосам.

---

## Redux Selectors:

### selectItems

Функция для получения списка элементов из хранилища.

```javascript
export const selectItems = store => store.items;
```

#### Использование:

```javascript
const items = useSelector(selectItems);
```
---

### selectIsStarted

Функция для определения, начался ли процесс голосования из хранилища.

```javascript
export const selectIsStarted = store => store.isStarted;
```

#### Использование:

```javascript
const isStarted = useSelector(selectIsStarted);
```
---

### selectUser

Функция для получения пользователя из хранилища.

```javascript
export const selectUser = store => store.user;
```

#### Использование:

```javascript
const user = useSelector(selectUser);
```
---

### selectShowRegistration

Функция для определения, показывается ли регистрация из хранилища.

```javascript
export const selectShowRegistration = store => store.showRegistration;
```

#### Использование:

```javascript
const showRegistration = useSelector(selectShowRegistration);
```
---

### selectIsCanVote

Функция для определения, может ли пользователь голосовать.

```javascript
export const selectIsCanVote = store => store.canVote;
```

#### Использование:

```javascript
const canVote = useSelector(selectIsCanVote);
```
---

### selectAllVotedForItem

Функция для получения всех пользователей, проголосовавших за определенный элемент.

```javascript
export const selectAllVotedForItem = (store, itemId) => store.items.find(({id}) => id === itemId)?.voted ?? [];
```

#### Использование:

```javascript
const itemId = "1";
const allVotedForItem = useSelector(store => selectAllVotedForItem(store, itemId));
```
---

### selectVotedCounterForItem

Функция для подсчета количества пользователя, проголосовавших за определенный элемент.

```javascript
export const selectVotedCounterForItem = (store, itemId) => selectAllVotedForItem(store, itemId).length ?? 0;
```

#### Использование:

```javascript
const itemId = "1";
const votedCounterForItem = useSelector(store => selectVotedCounterForItem(store, itemId));
```
---

### isSelected

Функция для определения, проголосовал ли определенный пользователь за конкретный элемент.

```javascript
export const isSelected = (store, itemId, user) => selectAllVotedForItem(store, itemId).includes(user);
```

#### Использование:

```javascript
const itemId = "1";
const user = "User1";
const isSelectedItem = useSelector(store => isSelected(store, itemId, user));
```
---

### allVotes

Функция для получения общего количества голосов.

```javascript
export const allVotes = (store) => store?.items?.reduce((result, {voted}) => result + voted.length, 0) ?? 0;
```

#### Использование:

```javascript
const totalVotes = useSelector(allVotes);
```
---

### selectPercentByAll

Функция для вычисления процентного соотношения голосов за конкретный элемент ко всем голосам.

```javascript
export const selectPercentByAll = (store, {voted}) => (voted.length / allVotes(store)) * 100;
```

#### Использование:

```javascript
const voted = useUser.votes;
const percentByAll = useSelector(store => selectPercentByAll(store, {voted}));
```

# Redux Store

В данной документации описана конфигурация Redux хранилища с использованием нашего существующего votingReducer.

---

## Redux Store:

#### Configure Store

В функции `configureStore` мы передаем наш `votingReducer` который будет обрабатывать все соответствующие экшены и возвращать обновленное состояние.

```javascript
import { configureStore } from '@reduxjs/toolkit';
import votingReducer from './votingSlice';

const store = configureStore({
    reducer: votingReducer,
});

export default store;
```

#### Использование:

Для использования этого хранилища в нашем приложении `React`, мы должны обернуть наше приложение в компонент `Provider` из `react-redux` и передать наше хранилище в качестве свойства.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
```
# Редакс Thunk

В данной документации описаны все Redux Thunk функции из данного файла.

---

## Redux Thunk:

Все перечисленные функции являются асинхронными thunk функциями, основными действиями которых является запрос к API, обработка ответа и делегирование данных в функции-редьюсеры.

### postItem

Функция для отправки нового элемента на сервер. Принимает `item` , который должен быть отправлен.

```javascript
export const postItem = (item) => async dispatch => {
    const response = await fetch('http://localhost:3001/api/voteItems', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: item,
            votes: 0
        }),
    });
    const result = await response.json();

    dispatch(setItems(result));
};
```

---

### fetchItems

Функция для получения всех существующих элементов с сервера.

```javascript
export const fetchItems = () => async dispatch => {
    const response = await fetch('http://localhost:3001/api/voteItems');
    const result = await response.json();

    dispatch(setItems(result));
};
```

---

### handleStartStop

Функция для отправки запроса на запуск/остановку голосования. Принимает `isStarted` , чтобы определить текущее состояние.

```javascript
export const handleStartStop = (isStarted) => async dispatch => {
    const partOfPath = isStarted ? 'stop' : 'start';
    const response = await fetch(`http://localhost:3001/api/${partOfPath}`);
    const result = await response.json();

    dispatch(setItems(result));
    dispatch(setStart(!isStarted));
};
```

---

### removeItem

Функция для удаления существующего элемента. Принимает `id` , чтобы определить, какой элемент должен быть удален.

```javascript
export const removeItem = (id) => async dispatch => {
    const response = await fetch(`http://localhost:3001/api/voteItems/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const result = await response.json();

    dispatch(setItems(result));
};
```

---

### voteItem

Функция для принятия голоса пользователя. Принимает `id` и `user` , чтобы обработать голос.

```javascript
export const voteItem = (id, user) => async dispatch => {
    const response = await fetch(`http://localhost:3001/api/voteItems/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Unique-Identifier': user
        },
    })
    const result = await response.json();

    dispatch(response.ok ? setItems(result) : setError(result));
    dispatch(setCanVote(false))
};
```

---

### fetchData

Функция для загрузки всех необходимых данных при старте приложения. Принимает `user` , чтобы передать эту информацию в запрос.

```javascript
export const fetchData = (user) => async dispatch => {
    const responses = await Promise.all([
        fetch('http://localhost:3001/api/voteItems'),
        fetch('http://localhost:3001/api/isStarted'),
        fetch(`http://localhost:3001/api/canVote/${user}`)
    ])

    const results = await Promise.all(responses.map(response => response.json()));
    const [items, isStarted, canVote] = results;

    dispatch(setItems(items));
    dispatch(setStart(isStarted));
    dispatch(setCanVote(canVote));
};
```

---

#### Использование Thunks:

Вы можете использовать Thunk в компонентах с помощью функции `useDispatch` из `react-redux`.

```javascript
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems } from './yourFileWithThunks';

export const ExampleComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])

  // Other component code
}
```
# Redux Toolkit Slice

В данной документации описан `votingSlice`, использованный в коде.

## Redux Toolkit Slice

`votingSlice` является частью состояния (state) в Redux, которая отвечает за модуль "voting". С помощью `createSlice` функции из `@reduxjs/toolkit` создаётся новый slice состояния.

### Общее описание

Сначала задаётся `initialState`, который описывает начальное состояние slice.

```javascript
const initialState = {
    items: [],
    isStarted: false,
    user: null,
    canVote: false,
    showRegistration: false,
    error: null,
};
```

Далее создаётся сам `votingSlice`.

```javascript
const votingSlice = createSlice({
    name: 'voting',
    initialState,
    reducers: {
        // Reducers go here
    },
});
```

В slices управление изменением state происходит через редукторы (`reducers`). Редукторы представляют собой функции, которые принимают текущее состояние и действие, а возвращают новое состояние.

---

### Редукторы

#### setShowRegistration

Устанавливает значение `showRegistration`.

```javascript
setShowRegistration: (state, action) => {
    state.showRegistration = action.payload;
},
```

#### setUser

Устанавливает значение `user`.

```javascript
setUser: (state, action) => {
    state.user = action.payload;
},
```

#### setCanVote

Устанавливает значение `canVote`.

```javascript
setCanVote: (state, action) => {
    state.canVote = action.payload;
},
```

#### setStart

Устанавливает значение `isStarted` и `canVote`.

```javascript
setStart: (state, action) => {
    state.isStarted = action.payload;
    state.canVote = true;
},
```

#### setError

Устанавливает значение `error` и `canVote`.

```javascript
setError: (state, action) => {
    state.error = action.payload;
    state.canVote = false;
},
```

#### setItems

Устанавливает значение `items`.

```javascript
setItems: (state, action) => {
    state.items = action.payload;
},
```

---

### Как использовать

На выходе экспортируются все редукторы и сам редуктор для Redux Store.

```javascript
export const {
    setShowRegistration,
    setUser,
    setCanVote,
    setStart,
    setError,
    setItems,
} = votingSlice.actions;

export default votingSlice.reducer;
```

Чтобы использовать, необходимо импортировать необходимые редукторы, а затем использовать их с помощью функции `dispatch` из `react-redux`:

```javascript
import React from 'react';
import { useDispatch } from 'react-redux';
import { setShowRegistration } from './yourFileWithVotingSlice';

export const ExampleComponent = () => {
  const dispatch = useDispatch();

  const openRegistration = () => {
    dispatch(setShowRegistration(true))
  }

  // Other component code
}
```

---
При возникновении вопросов или проблем, пожалуйста, обратитесь в поддержку.

## Обратите внимание

Все API-запросы в этом компоненте направлены на `http://localhost:3001/api/**`. Если ваш сервер работает на другом домене или порту, вам будет необходимо обновить эту настройку.