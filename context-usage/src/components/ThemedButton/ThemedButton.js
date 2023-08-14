import React, {useContext} from 'react';
import {ThemeContext} from '../../context/ThemeContext';
import './ThemeButton.css';

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