# Voting App

Это приложение на React и Redux позволяет пользователям голосовать за элементы после регистрации.

## Основные компоненты и функции

### Импорты:
```javascript
import './App.css';
import {AddForm} from './components/AddForm/AddForm';
import {useDispatch, useSelector} from 'react-redux';
import {allVotes, selectItems, selectUser} from './store/selectors';
import {VoteItem} from './components/VoteItem/VoteItem';
import {useEffect} from 'react';
import {setCanVote, setItems, setShowRegistration, setStart} from './store/actions';
import {Introduce} from './components/Introduce/Introduce';
```
- `App.css` - Стили для компонента App.
- `AddForm` - Компонент формы для добавления новых элементов.
- `useDispatch, useSelector` - Хуки Redux для работы с глобальным состоянием.
- `allVotes, selectItems, selectUser` - Селекторы Redux для выбора состояния.
- `VoteItem` - Компонент для отображения отдельных элементов для голосования.
- `useEffect` - Хук React для выполнения сайд-эффектов.
- `setCanVote, setItems, setShowRegistration, setStart` - Действия Redux.
- `Introduce` - Компонент для ввода пользователя.

### Главная функция App:
```javascript
function App() {
    const items = useSelector(selectItems);
    const user = useSelector(selectUser);
    const allVotedCounter = useSelector(allVotes);
    const dispatch = useDispatch();
    ...
    return (...)
}
```
Функция App делает следующее:
- Использует селекторы Redux для получения данных об элементах, текущим пользователе и общем количестве голосов.
- Создает переменную dispatch с помощью хука useDispatch.
- Возвращает JSX, который будет отрендерен браузером.

## Пример использования
### Незарегистрированный пользователь:
При открытии приложения пользователь увидит сообщение о том, что для голосования необходимо зарегистрироваться. После нажатия на кнопку "Зарегистрироваться", откроется форма регистрации, где пользователь сможет ввести свои данные и зарегистрироваться.

### Зарегистрированный пользователь:
После входа в систему пользователь увидит форму для добавления новых элементов для голосования, общее количество голосов и список элементов для голосования. Пользователь сможет добавить новые элементы с помощью формы добавления и проголосовать за существующие элементы.

### VoteItem компонент:
VoteItem отображает отдельный элемент для голосования, он принимает элемент в качестве props и отображает его данные. Пример использования:
```javascript
<VoteItem key={item.id} item={item}/>
```

### AddForm компонент:
AddForm позволяет добавить новый элемент для голосования. Пример использования:
```javascript
<AddForm/>
```

### Introduce компонент:
Introduce - это вспомогательный компонент, для отображения дополнительной информации или ввода пользователя. Пример использования:
```javascript
<Introduce/>
```