import React, {useContext} from 'react';
import {ThemeContext} from '../../context/ThemeContext';
import './Header.css';

export const Header = ({children}) => {
    const {theme} = useContext(ThemeContext);

    return (
        <>
            <div className={`header ${theme}`}>
                header
                {children}
            </div>
        </>
    );
};