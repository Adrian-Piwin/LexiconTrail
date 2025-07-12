import React from 'react';
import ClickableDefinition from '../ClickableDefinition/ClickableDefinition';
import './MultipleDefinitions.css';

/**
 * Component that renders multiple definition cards for a word
 * @param {Object} props
 * @param {Array<string>} props.definitions - Array of definition texts to render
 * @param {Function} props.onWordClick - Callback when a word is clicked
 * @param {Set} props.availableWords - Set of words that are available for clicking
 * @param {string} props.currentWord - The word these definitions are for
 * @param {boolean} props.isClickable - Whether words should be clickable (default: true)
 */
const MultipleDefinitions = ({ definitions, onWordClick, availableWords, currentWord, isClickable = true }) => {
  if (!definitions || definitions.length === 0) {
    return <p className="definition-empty">No definitions available.</p>;
  }

  // Limit to top 3 definitions
  const limitedDefinitions = definitions.slice(0, 3);

  return (
    <div className="multiple-definitions">
      {limitedDefinitions.map((definition, index) => (
        <div key={index} className="definition-card">
          <ClickableDefinition 
            definition={definition}
            onWordClick={onWordClick}
            isClickable={isClickable}
            availableWords={availableWords}
            currentWord={currentWord}
          />
        </div>
      ))}
    </div>
  );
};

export default MultipleDefinitions; 
