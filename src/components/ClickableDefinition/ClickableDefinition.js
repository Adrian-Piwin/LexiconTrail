import React from 'react';
import { parseDefinition } from '../../utils/definitionParser';
import './ClickableDefinition.css';

/**
 * Component that renders a definition with clickable words
 * @param {Object} props
 * @param {string} props.definition - The definition text to render
 * @param {Function} props.onWordClick - Callback when a word is clicked
 * @param {boolean} props.isClickable - Whether words should be clickable (default: true)
 */
const ClickableDefinition = ({ definition, onWordClick, isClickable = true }) => {
  if (!definition) {
    return <p className="definition-empty">No definition available.</p>;
  }

  const parsedWords = parseDefinition(definition);

  const handleWordClick = (word, cleanWord) => {
    if (isClickable && onWordClick) {
      onWordClick(cleanWord);
    }
  };

  return (
    <div className="clickable-definition">
      {parsedWords.map((item, index) => {
        if (item.isClickable && isClickable) {
          return (
            <button
              key={`${item.cleanWord}-${index}`}
              className="definition-word clickable"
              onClick={() => handleWordClick(item.word, item.cleanWord)}
              title={`Click to navigate to "${item.cleanWord}"`}
            >
              {item.word}
            </button>
          );
        } else {
          return (
            <span key={`${item.word}-${index}`} className="definition-word">
              {item.word}
            </span>
          );
        }
      })}
    </div>
  );
};

export default ClickableDefinition; 
