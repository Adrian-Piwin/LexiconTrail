import React, { useState } from 'react';
import Header from './Header/Header';
import StartTarget from './StartTarget/StartTarget';
import CurrentWord from './CurrentWord/CurrentWord';
import Trail from './Trail/Trail';
import InstructionsModal from './InstructionsModal/InstructionsModal';
import LoadingSpinner from './LoadingSpinner/LoadingSpinner';
import { useApiGameState } from '../hooks/useApiGameState';
import './Game.css';
import './Game-mobile.css';

/**
 * Main game component that handles the core gameplay
 */
const Game = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  
  const {
    currentWord,
    targetWord,
    moveCount,
    gameStatus,
    gameHistory,
    isLoading,
    errorMessage,
    availableWords,
    startNewGame,
    handleWordClick,
    resetGame,
    getCurrentDefinitions,
    getTargetDefinitions,
    isGameWon
  } = useApiGameState();

  const currentDefinitions = getCurrentDefinitions();

  // Render idle state (no game started)
  if (gameStatus === 'idle') {
    return (
      <div className="game-container">
        <Header 
          title="Lexicon Trail"
          description="Navigate from the start word to the target word by clicking words in definitions!"
          showInfoButton={true}
          onInfoClick={() => setShowInstructions(true)}
        />
        <div className="game-start">
          <button 
            className="btn btn-primary" 
            onClick={startNewGame}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Start New Game'}
          </button>
        </div>
        
        <InstructionsModal 
          isOpen={showInstructions}
          onClose={() => setShowInstructions(false)}
        />
      </div>
    );
  }

  // Render win state
  if (gameStatus === 'won') {
    return (
      <div className="game-container">
        <Header title="Lexicon Trail" />
        <div className="win-message">
          <h2>🎉 You Win! 🎉</h2>
          <p>You reached "{targetWord}" in {moveCount} moves!</p>
        </div>
        
        <Trail gameHistory={gameHistory} moveCount={moveCount} />

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
      <Header 
        title="Lexicon Trail"
        showInfoButton={true}
        onInfoClick={() => setShowInstructions(true)}
      />

      <div className="game-content">
        {/* Error message display */}
        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
            <button 
              className="btn btn-secondary" 
              onClick={() => window.location.reload()}
              style={{ marginTop: '0.5rem', fontSize: '0.8rem', padding: '0.5rem 1rem' }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="loading-indicator">
            <LoadingSpinner message="Loading definition..." size="medium" />
          </div>
        )}

        <StartTarget 
          startWord={gameHistory[0]}
          targetWord={targetWord}
        />

        <CurrentWord 
          currentWord={currentWord}
          definitions={currentDefinitions}
          onWordClick={handleWordClick}
          availableWords={availableWords}
        />

        <Trail gameHistory={gameHistory} moveCount={moveCount} />
      </div>

      <div className="game-actions">
        <button 
          className="btn btn-primary" 
          onClick={startNewGame}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'New Game'}
        </button>
        <button className="btn btn-secondary" onClick={resetGame}>
          Back to Menu
        </button>
      </div>
      
      <InstructionsModal 
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />
    </div>
  );
};

export default Game; 
