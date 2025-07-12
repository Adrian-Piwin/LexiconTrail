import React from 'react';
import MultipleDefinitions from '../MultipleDefinitions/MultipleDefinitions';
import './CurrentWord.css';

const CurrentWord = ({ currentWord, definitions, onWordClick, availableWords }) => {
  return (
    <div className="current-word-section">
      <h2>Current Word</h2>
      <div className="current-word-card">
        <h3>{currentWord}</h3>
        <MultipleDefinitions 
          definitions={definitions}
          onWordClick={onWordClick}
          availableWords={availableWords}
          currentWord={currentWord}
        />
      </div>
    </div>
  );
};

export default CurrentWord; 
