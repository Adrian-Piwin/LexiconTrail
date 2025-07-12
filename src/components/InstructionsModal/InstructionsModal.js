import React from 'react';
import './InstructionsModal.css';

const InstructionsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>How to Play</h2>
        <div className="instructions">
          <p><strong>Objective:</strong> Navigate from the start word to the target word by clicking words in definitions.</p>
          <ol>
            <li>Click "Start New Game" to get a random start and target word</li>
            <li>Read the definition of the current word</li>
            <li>Click on any highlighted word in the definition to navigate to that word</li>
            <li>Continue clicking words until you reach the target word</li>
            <li>Try to reach the target in as few moves as possible!</li>
          </ol>
          <p><strong>Tip:</strong> Only words that exist in our dictionary are clickable. Common words like "the", "and", "is" are not clickable.</p>
        </div>
        <button className="btn btn-primary" onClick={onClose}>
          Got it!
        </button>
      </div>
    </div>
  );
};

export default InstructionsModal; 
