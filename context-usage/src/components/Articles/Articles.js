import React, {useContext} from 'react';
import {ThemeContext} from '../../context/ThemeContext';
import './Articles.css';

export const Articles = () => {
    const {theme} = useContext(ThemeContext);

    return (
        <>
            <div className={`articles ${theme}`}>
                articles
            </div>
        </>
    );
};