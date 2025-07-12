import React from 'react';
import './Trail.css';
import './Trail-mobile.css';

const Trail = ({ gameHistory, moveCount }) => {
  if (gameHistory.length <= 1) {
    return null;
  }

  return (
    <div className="game-info">
      <div className="info-card">
        <div className="trail-header">
          <h3>Your Trail</h3>
          <span className="stat">{moveCount}</span>
        </div>
        <div className="path-display">
          {gameHistory.map((word, index) => (
            <span key={index} className="path-word">
              {word}
              {index < gameHistory.length - 1 && <span className="path-arrow"> → </span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trail; 
