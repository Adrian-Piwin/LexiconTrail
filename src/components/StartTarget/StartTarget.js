import React from 'react';
import './StartTarget.css';

const StartTarget = ({ startWord, targetWord }) => {
  return (
    <div className="start-target-display">
      <div className="start-word">
        <h3>{startWord}</h3>
        <p>Start</p>
      </div>
      <div className="arrow">→</div>
      <div className="target-word">
        <h3>{targetWord}</h3>
        <p>Target</p>
      </div>
    </div>
  );
};

export default StartTarget; 
