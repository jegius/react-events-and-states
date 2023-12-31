[На главную](../../../README.md)
# VoteItem

VoteItem - это компонент React, который представляет собой отдельный элемент голосования.

## Содержание
- [Описание](#Описание)
- [Сторонние библиотеки](#Сторонние-библиотеки)
- [Пропсы](#Пропсы)
- [Логика компонента](#Логика-компонента)
- [Примеры использования](#Примеры-использования)

## Описание
Компонент представляет собой элемент списка для голосования. Предназначен для удаления элемента или отдачи голоса.

## Сторонние библиотеки
- `React` - основная библиотека для создания пользовательского интерфейса.
- `useDispatch`, `useSelector` - React Hooks из библиотеки `react-redux`, позволяющие взаимодействовать с Redux Store.
- `removeItem`, `voteItem` - Thunk actions, экшены Redux, осуществляющие асинхронные операции (в данном случае - удаление элемента и голосование).

## Пропсы

| Имя пропса |  Тип  | Описание                      |
| ---------- | ----- | ----------------------------- |
| item       | object | Объект, представляющий элемент голосования. |


## Логика компонента
Сначала мы с помощью useDispatch и useSelector подключаемся к Redux Store.

Затем определяются обработчики для удаления и голосования, каждый из которых диспатчит соответствующий thunk action.

Возвращаемое значение - JSX-код, отображающий каждый элемент голосования. Кнопка включена или отключена в зависимости от того, разрешено ли голосование, и активно ли оно в данный момент.


## Примеры использования

### Пример импорта и использования в приложении:

```jsx
import { VoteItem } from './VoteItem/VoteItem';

function App() {
  return (
    <div className="App">
        <VoteItem item={item} />
    </div>
  );
}

export default App;
```

---

При возникновении проблем или вопросов по использованию этого компонента, пожалуйста, обратитесь в службу поддержки.

## Обратите внимание

Все API-запросы в этом компоненте направлены на `http://localhost:3001/api/**`. Если ваш сервер работает на другом домене или порту, вам будет необходимо обновить эту настройку.