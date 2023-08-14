import React, {useContext} from 'react';
import {ThemeContext} from '../../context/ThemeContext';
import './Sitebar.css';

export const Sitebar = () => {
    const {theme} = useContext(ThemeContext);

    return (
        <>
            <div className={`sitebar ${theme}`}>sitebar</div>
        </>
    );
};