import React, {useContext} from 'react';
import {ThemeContext} from '../../context/ThemeContext';
import './Footer.css';

export const Footer = () => {
    const {theme} = useContext(ThemeContext);

    return (
        <>
            <div className={`footer ${theme}`}>footer</div>
        </>
    );
};