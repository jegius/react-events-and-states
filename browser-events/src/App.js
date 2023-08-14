import './App.css';
import {useRef} from 'react';

const SIZE_5_REM = 80;

function setPosition(element, {clientX, clientY}) {
    const {style} = element;
    style.left = `${clientX - SIZE_5_REM}px`;
    style.top = `${clientY - SIZE_5_REM}px`;
}

function App() {
    const innerRef = useRef();

    const handleMouseDown = (event) => {
        setPosition(innerRef.current, event);
        innerRef.current?.classList.add('inner_active');
    };

    const handleMouseUp = () => {
        innerRef.current?.classList.remove('inner_active');
    };

    const handleMouseMove = (event) => {
        const isMovable = innerRef.current?.classList.contains('inner_active');
        if (isMovable) {
            setPosition(innerRef.current, event);
        }
    };

    return (
        <div className="app" onMouseMove={handleMouseMove}>
            <div ref={innerRef}
                 className="inner"
                 onMouseDown={handleMouseDown}
                 onMouseUp={handleMouseUp}></div>
        </div>
    );
}

export default App;
