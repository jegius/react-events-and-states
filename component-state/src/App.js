import {useState} from 'react';
import './App.css';

const SIZE_5_REM = 80;

const classes = {
    ACTIVE: 'inner_active',
    IN_ACTIVE: 'inner'
}

function App() {
    const [activeClass, setActiveClass] = useState(classes.IN_ACTIVE)
    const [position, setPosition] = useState({
        left: `calc(50% - ${SIZE_5_REM}px)`,
        top: `calc(50% - ${SIZE_5_REM}px)`
    });

    const handleMouseDown = event => {
        setPosition({
            left: event.clientX - SIZE_5_REM,
            top: event.clientY - SIZE_5_REM
        });
        setActiveClass(() => `${activeClass} ${classes.ACTIVE}`);
    };

    const handleMouseUp = () => {
        setActiveClass(classes.IN_ACTIVE);
    };

    const handleMouseMove = event => {
        if (activeClass.includes(classes.ACTIVE) ) {
            setPosition({
                left: event.clientX - SIZE_5_REM,
                top: event.clientY - SIZE_5_REM
            });
        }
    };

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
}

export default App;