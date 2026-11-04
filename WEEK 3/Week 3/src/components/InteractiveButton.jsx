import { useState } from 'react';

function InteractiveButton() {
  const [clickCount, setClickCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: isPressed ? '#0056b3' : '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transform: isPressed ? 'scale(0.95)' : 'scale(1)',
    transition: 'all 0.1s ease',
  };

  return (
    <div>
      <button
        type="button"
        style={buttonStyle}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        Click Me! ({clickCount})
      </button>
      <p>Status: {isPressed ? 'Pressed' : isHovered ? 'Hovered' : 'Normal'}</p>
    </div>
  );
}

export default InteractiveButton;