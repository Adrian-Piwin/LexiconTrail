import React from 'react';
import ClickableDefinition from '../ClickableDefinition/ClickableDefinition';
import './CurrentWord.css';

const CurrentWord = ({ currentWord, definition, onWordClick, availableWords }) => {
  return (
    <div className="current-word-section">
      <h2>Current Word</h2>
      <div className="current-word-card">
        <h3>{currentWord}</h3>
        <ClickableDefinition 
          definition={definition}
          onWordClick={onWordClick}
          isClickable={true}
          availableWords={availableWords}
        />
      </div>
    </div>
  );
};

export default CurrentWord; 
