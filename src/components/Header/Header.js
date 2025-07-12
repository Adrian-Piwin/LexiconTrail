import React from 'react';
import './Header.css';
import './Header-mobile.css';

const Header = ({ title, description, showInfoButton, onInfoClick, showStats, moveCount }) => {
  return (
    <div className="game-header">
      <h1>{title}</h1>
      {showInfoButton && (
        <button 
          className="info-button" 
          onClick={onInfoClick}
          title="How to play"
        >
          ?
        </button>
      )}
      {description && (
        <p className="game-description">{description}</p>
      )}
      {showStats && (
        <div className="game-stats">
          <span className="stat">Moves: {moveCount}</span>
        </div>
      )}
    </div>
  );
};

export default Header; 
