import React, { useState, useEffect } from 'react';

function About() {
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    setTimeout(() => {
      setColor('#ffd700');
    }, 1000);

    setTimeout(() => {
      setColor('#ffffff');
    }, 2000);
  }, []);

  return (
    <div id="instructions" style={{ backgroundColor: color }}>
      <button
        onClick={() => {
          setColor('#ffd700');
          setTimeout(() => {
            setColor('#ffffff');
          }, 1000);
        }}
      >
        Change Background Color
      </button>
    </div>
  );
}

export default About;
