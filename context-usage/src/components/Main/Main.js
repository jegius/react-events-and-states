import React, {useContext} from 'react';
import {ThemeContext} from '../../context/ThemeContext';
import './Main.css';

export const Main = ({children}) => {
    const {theme} = useContext(ThemeContext);

    return (
        <>
            <div className={`main ${theme}`}>
                main
                <div className="main-content">
                    {children}
                </div>
            </div>
        </>
    );
};