import React from 'react';
import styles from './Background.module.css';
import cardImage from '../background-assets/cards.png';
import gunImage from '../background-assets/gun.png';
import moneyImage from '../background-assets/money.png';

const images = [cardImage, gunImage, moneyImage];

const Background = () => {
  return (
    <div className={styles.backgroundContainer} data-aos="fade-up">
      <div className={styles.backgroundImage}>
        {[...Array(30)].map((_, index) => {
          const randomImage = images[Math.floor(Math.random() * images.length)];
          return (
            <div
              key={index}
              className={styles.backgroundImageItem}
              style={{
                backgroundImage: `url(${randomImage})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                right: `${Math.random() * 100}%`,
                bottom: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 30}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Background;
