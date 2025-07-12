import React from 'react';
import ClickableDefinition from './ClickableDefinition';
import { useGameState } from '../hooks/useGameState';
import './Game.css';

/**
 * Main game component that handles the core gameplay
 */
const Game = () => {
  const {
    currentWord,
    targetWord,
    moveCount,
    gameStatus,
    gameHistory,
    startNewGame,
    handleWordClick,
    resetGame,
    getCurrentDefinition,
    getTargetDefinition,
    isGameWon
  } = useGameState();

  const currentDefinition = getCurrentDefinition();
  const targetDefinition = getTargetDefinition();

  // Render idle state (no game started)
  if (gameStatus === 'idle') {
    return (
      <div className="game-container">
        <div className="game-header">
          <h1>Lexicon Trail</h1>
          <p className="game-description">
            Navigate from the start word to the target word by clicking words in definitions!
          </p>
        </div>
        <div className="game-start">
          <button className="btn btn-primary" onClick={startNewGame}>
            Start New Game
          </button>
        </div>
      </div>
    );
  }

  // Render win state
  if (gameStatus === 'won') {
    return (
      <div className="game-container">
        <div className="game-header">
          <h1>Lexicon Trail</h1>
          <div className="win-message">
            <h2>🎉 You Win! 🎉</h2>
            <p>You reached "{targetWord}" in {moveCount} moves!</p>
          </div>
        </div>
        
        <div className="game-info">
          <div className="info-card">
            <h3>Final Path</h3>
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

        <div className="game-actions">
          <button className="btn btn-primary" onClick={startNewGame}>
            Play Again
          </button>
          <button className="btn btn-secondary" onClick={resetGame}>
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  // Render active game state
  return (
    <div className="game-container">
      <div className="game-header">
        <h1>Lexicon Trail</h1>
        <div className="game-stats">
          <span className="stat">Moves: {moveCount}</span>
        </div>
      </div>

      <div className="game-content">
        <div className="word-display">
          <div className="current-word-section">
            <h2>Current Word</h2>
            <div className="word-card current">
              <h3>{currentWord}</h3>
              <ClickableDefinition 
                definition={currentDefinition}
                onWordClick={handleWordClick}
                isClickable={true}
              />
            </div>
          </div>

          <div className="target-word-section">
            <h2>Target Word</h2>
            <div className="word-card target">
              <h3>{targetWord}</h3>
              <ClickableDefinition 
                definition={targetDefinition}
                onWordClick={() => {}} // Target definition is not clickable
                isClickable={false}
              />
            </div>
          </div>
        </div>

        {gameHistory.length > 1 && (
          <div className="game-info">
            <div className="info-card">
              <h3>Your Path</h3>
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
        )}
      </div>

      <div className="game-actions">
        <button className="btn btn-primary" onClick={startNewGame}>
          New Game
        </button>
        <button className="btn btn-secondary" onClick={resetGame}>
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default Game; 
