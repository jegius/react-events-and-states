# Проект React - Переключатель Тем

Это учебный проект, показывающий, как можно применять и переключать темы на React.

## Содержание

* [Технологии](#технологии)
* [Установка](#установка)
* [Описание кода](#описание-кода)
    * [ThemeContext](#themecontext)
    * [App](#app)
    * [ThemeProvider](#themeprovider)
    * [ThemedButton](#themedbutton)

## Технологии

* React
* CSS

## Установка

Чтобы запустить проект локально, сделайте следующее:

1. Клонируйте этот репозиторий.
2. Установите все необходимые модули с помощью `npm install`.
3. Запустите проект с помощью `npm start`. Проект будет загружен в вашем браузере по адресу `localhost:3000`.

## Описание кода

### ThemeContext

Создаем контекст для работы с темами.

```jsx
export const ThemeContext = React.createContext(undefined);
```

### App

`App` - это наш главный компонент, здесь мы используем контекст `ThemeContext` для установки текущей темы и применения соответствующего класса CSS, который определяет светлую или темную тему для приложения.

```jsx
export const App = () => {
    const {theme} = useContext(ThemeContext);

    return (
        <div className={`container ${theme}`}>
            // Компоненты приложения здесь...
        </div>
    );
};
```

### ThemeProvider

`ThemeProvider` - это компонент контекста, который хранит состояние текущей темы. Можно переключаться между светлой и темной темой с помощью функции `toggleTheme`.

```jsx
export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('light-theme');

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light-theme' ? 'dark-theme' : 'light-theme');
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};
```

### ThemedButton

`ThemedButton` - это компонент кнопки, он также использует контекст `ThemeContext` для изменения своего внешнего вида на основе текущей темы. По клике на кнопку вызывается `toggleTheme`, который меняет текущую тему.

```jsx
export const ThemedButton = () => {
    const {theme, toggleTheme} = useContext(ThemeContext);

    return (
        <>
            <div className={`button-wrapper ${theme}`}>
                <button className={`button-wrapper__button ${theme}`} onClick={toggleTheme}>
                    Switch Theme
                </button>
            </div>
        </>
    );
};
```
Таким образом, этот проект демонстрирует, как можно работать с React Context для применения и переключения тем.