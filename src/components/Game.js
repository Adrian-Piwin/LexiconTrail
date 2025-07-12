import React, { useState } from 'react';
import Header from './Header/Header';
import StartTarget from './StartTarget/StartTarget';
import CurrentWord from './CurrentWord/CurrentWord';
import Trail from './Trail/Trail';
import InstructionsModal from './InstructionsModal/InstructionsModal';
import { useGameState } from '../hooks/useGameState';
import './Game.css';

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
    startNewGame,
    handleWordClick,
    resetGame,
    getCurrentDefinition,
    getTargetDefinition,
    isGameWon
  } = useGameState();

  const currentDefinition = getCurrentDefinition();

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
          <button className="btn btn-primary" onClick={startNewGame}>
            Start New Game
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
        <StartTarget 
          startWord={gameHistory[0]}
          targetWord={targetWord}
        />

        <CurrentWord 
          currentWord={currentWord}
          definition={currentDefinition}
          onWordClick={handleWordClick}
        />

        <Trail gameHistory={gameHistory} moveCount={moveCount} />
      </div>

      <div className="game-actions">
        <button className="btn btn-primary" onClick={startNewGame}>
          New Game
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
