import React, { useState } from 'react';
import styles from './StartButton.module.css';

const StartButton = () => {
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    setIsOn(!isOn);
  };

  return (
    <a href="/Game" className={`${styles.button} ${isOn ? styles.on : ''}`} onClick={handleClick}>
      Start Game
    </a>
  );
};

export default StartButton;
