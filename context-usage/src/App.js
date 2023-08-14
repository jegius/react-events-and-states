import React, {useContext} from 'react';
import {Header} from './components/Header/Header';
import './App.css';
import {ThemedButton} from './components/ThemedButton/ThemedButton';
import {Sitebar} from './components/Sitebar/Sitebar';
import {Main} from './components/Main/Main';
import {Articles} from './components/Articles/Articles';
import {Footer} from './components/Footer/Footer';
import {ThemeContext} from './context/ThemeContext';

export const App = () => {
    const {theme} = useContext(ThemeContext);

    return (
        <div className={`container ${theme}`}>
            <Header>
                <ThemedButton/>
            </Header>
            <Main>
                <Sitebar/>
                <Articles/>
            </Main>
            <Footer/>
        </div>
    );
};

export default App;