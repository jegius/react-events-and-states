# Drag-n-Drop приложения на React

В этой документации подробно разбирается работа драг-н-дроп приложения, написанного на React.

## Константы

```javascript
const SIZE_5_REM = 80;
```

`SIZE_5_REM` - это коэффициент, используемый для смещения перетаскиваемого блока, чтобы курсор мыши находился в его центре.

## Функция setPosition

```javascript
function setPosition(element, {clientX, clientY}) {
    const {style} = element;
    style.left = ${clientX - SIZE_5_REM}px;
    style.top = ${clientY - SIZE_5_REM}px;
}
```

Функция `setPosition` принимает два аргумента: элемент, позицию которого мы хотим изменить, и объект события мыши.

Через деструктуризацию получаем свойство `style` у нашего элемента и затем изменяем его свойства `left` и `top`, устанавливая их равным текущим координатам мыши `clientX` и `clientY` с учетом смещения `SIZE_5_REM`.

## Компонент App

```javascript
function App() {
    ...
}
export default App;
```

Функциональный компонент `App`, где реализуется взаимодействие с пользовательским интерфейсом.

### innerRef

```javascript
const innerRef = useRef();
```

`innerRef` - это `ref` на перемещаемый элемент внутри нашего приложения.

### Обработчик событий handleMouseDown

```javascript
const handleMouseDown = (event) => {
    setPosition(innerRef.current, event);
    innerRef.current?.classList.add('inner_active');
};
```

`handleMouseDown` - обработчик событий отслеживающий нажатие кнопки мыши над элементом. При срабатывании обработчика, с помощью функции `setPosition`, позиция элемента задается в соответствии с позицией указателя мыши и к элементу добавляется класс 'inner_active'.

### Обработчик событий handleMouseUp

```javascript
const handleMouseUp = () => {
    innerRef.current?.classList.remove('inner_active');
};
```

`handleMouseUp` - обработчик событий отслеживающий отпускание кнопки мыши. При срабатывании обработчика с элемента удаляется класс 'inner_active'.

### Обработчик событий handleMouseMove

```javascript
const handleMouseMove = (event) => {
    const isMovable = innerRef.current?.classList.contains('inner_active');
    if (isMovable) {
        setPosition(innerRef.current, event);
    }
};
```

`handleMouseMove` - обработчик события, отслеживающий перемещение указателя мыши на всем протяжении компонента App. При его срабатывании проверяется наличие класса 'inner_active' на нашем элементе, и если он присутствует, обновляется позиция элемента.

### Разметка

```javascript
return (
    <div className="app" onMouseMove={handleMouseMove}>
        <div ref={innerRef}
             className="inner"
             onMouseDown={handleMouseDown}
             onMouseUp={handleMouseUp}></div>
    </div>
);
```

root элементом приложения является `div` с классом `app`, на него навешивается обработчик событий `onMouseMove`. Дочерним элементом является `div` с классом `inner`, на который навешены обработчики `handleMouseDown` и `handleMouseUp` для обработки соответствующих событий. Элемент `div` с классом `inner` также использует `ref`, чтобы мы могли получить прямой доступ к DOM элементу.