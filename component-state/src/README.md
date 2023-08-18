# React Drag-n-Drop Учебный Проект

Это учебный проект, разработанный для демонстрации работы с событиями и стейтами в React.

## Содержание

* [Технологии](#технологии)
* [Установка](#установка)
* [Описание кода](#описание-кода)
    * [useState](#useState)
    * [handleMouseDown](#handleMouseDown)
    * [handleMouseUp](#handleMouseUp)
    * [handleMouseMove](#handleMouseMove)
    * [Рендеринг компонента](#рендеринг-компонента)

## Технологии

* React
* CSS

## Установка

Чтобы запустить проект локально, сделайте следующее:

1. Клонируйте репозиторий.
2. Установите все необходимые модули, используя команду `npm install` в терминале.
3. Затем просто используйте `npm start` для запуска проекта.

Проект будет автоматически открыт в браузере по адресу `localhost:3000`.

## Описание кода

### useState

Состояние в этом проекте управляется с помощью хука `useState` из React. Вот как мы объявляем состояние для активного класса и позиции элемента:

```jsx
const [activeClass, setActiveClass] = useState(classes.IN_ACTIVE)
const [position, setPosition] = useState({
    left: calc(50% - ${SIZE_5_REM}px),
    top: calc(50% - ${SIZE_5_REM}px)
});
```

### handleMouseDown

Функция `handleMouseDown` вызывается, когда пользователь нажимает кнопку мыши. Здесь мы устанавливаем позицию элемента (относительно курсора мыши) и добавляем активный класс для элемента.

```jsx
const handleMouseDown = event => {
    setPosition({
        left: event.clientX - SIZE_5_REM,
        top: event.clientY - SIZE_5_REM
    });
    setActiveClass(() => `${activeClass} ${classes.ACTIVE}`);
};
```

### handleMouseUp

Функция `handleMouseUp` слушает событие отпускания кнопки мыши. При этом мы убираем активный класс у элемента.

```jsx
const handleMouseUp = () => {
    setActiveClass(classes.IN_ACTIVE);
};
```

### handleMouseMove

При событии `handleMouseMove` мы проверяем, является ли элемент активным (т.е. кнопка мыши зажата), и если да, то меняем положение элемента в соответствии с движением мыши.

```jsx
const handleMouseMove = event => {
    if (activeClass.includes(classes.ACTIVATE) ) {
        setPosition({
            left: event.clientX - SIZE_5_REM,
            top: event.clientY - SIZE_5_REM
        });
    }
};
```

### Рендеринг компонента

Затем мы рендерим компонент, устанавливая обработчики событий на обёртке и самом элементе.

```jsx
return (
    <div className="app" onMouseMove={handleMouseMove}>
        <div
            style={{left: position.left, top: position.top, position: 'absolute'}}
            className={activeClass}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}>
        </div>
    </div>
);
```

Данное приложение представляет собой прекрасный пример основного взаимодействия с событиями и стейтами в React.