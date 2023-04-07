import React, { useState } from 'react';
import styles from './StartButton.module.css';
import { Link } from 'react-router-dom';

const StartButton = () => {
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    setIsOn(!isOn);
  };

  return (
    <Link
      to="/Game"
      className={`${styles.button} ${isOn ? styles.on : ''}`}
      onClick={handleClick}
    >
      Start Game
    </Link>
  );
};

export default StartButton;
