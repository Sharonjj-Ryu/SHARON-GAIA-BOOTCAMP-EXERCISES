import { useState } from 'react';

function KeyboardDemo() {
    const [inputValue, setInputValue] = useState('');
    const [keyLog, setKeyLog] = useState([]);
    const [charCount, setCharCount] = useState(0);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            alert(`You entered: ${inputValue}`);
        } else if (event.key === 'Escape') {
            setInputValue('');
            setCharCount(0);
        } else if (event.ctrlKey && event.key === 'a') {
            event.preventDefault();
            alert('ctrl+A pressed');
        }

        setKeyLog(prev => [...prev.slice(-4), event.key]);
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        setCharCount(value.length);
    };

    const handleKeyUp = (event) => {
        console.log(`Key released: ${event.key}`);
    };

    return (
        <div>
            <h3>Keyboard Event Demo</h3>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                placeholder="Type something... (Try Enter, Escape, Ctrl+A)"
            />
            <p>Character Count: {charCount}</p>
            <p>Recent keys: {keyLog.join(', ') || 'No keys yet'}</p>
            <small>
                Special commands:<br />
                Enter: Show alert with input value<br />
                Escape: Clear input<br />
                Ctrl+A: Show alert
            </small>
        </div>
    );
}

export default KeyboardDemo;