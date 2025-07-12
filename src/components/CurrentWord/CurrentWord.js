import React from 'react';
import MultipleDefinitions from '../MultipleDefinitions/MultipleDefinitions';
import './CurrentWord.css';
import './CurrentWord-mobile.css';

const CurrentWord = ({ currentWord, definitions, onWordClick, availableWords }) => {
  return (
    <div className="current-word-section">
      <h2>Current Word</h2>
      <h3 className="current-word-display">{currentWord}</h3>
      <MultipleDefinitions 
        definitions={definitions}
        onWordClick={onWordClick}
        availableWords={availableWords}
        currentWord={currentWord}
      />
    </div>
  );
};

export default CurrentWord; 
