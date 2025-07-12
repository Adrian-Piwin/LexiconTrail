import { useState, useCallback } from 'react';
import { sampleDictionary, getRandomStartAndTarget } from '../data/sampleDictionary';

/**
 * Custom hook to manage the game state
 * Handles starting new games, tracking moves, and checking win conditions
 */
export const useGameState = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [targetWord, setTargetWord] = useState('');
  const [moveCount, setMoveCount] = useState(0);
  const [gameStatus, setGameStatus] = useState('idle'); // 'idle', 'playing', 'won'
  const [gameHistory, setGameHistory] = useState([]);

  /**
   * Starts a new game with random start and target words
   */
  const startNewGame = useCallback(() => {
    const { start, target } = getRandomStartAndTarget();
    
    setCurrentWord(start);
    setTargetWord(target);
    setMoveCount(0);
    setGameStatus('playing');
    setGameHistory([start]);
  }, []);

  /**
   * Handles clicking on a word in the definition
   * @param {string} clickedWord - The word that was clicked
   */
  const handleWordClick = useCallback((clickedWord) => {
    if (gameStatus !== 'playing') return;
    
    const cleanWord = clickedWord.toLowerCase();
    
    // Verify the word exists in our dictionary
    if (!(cleanWord in sampleDictionary)) {
      console.warn(`Word "${clickedWord}" not found in dictionary`);
      return;
    }
    
    // Update game state
    setCurrentWord(cleanWord);
    setMoveCount(prev => prev + 1);
    setGameHistory(prev => [...prev, cleanWord]);
    
    // Check for win condition
    if (cleanWord === targetWord) {
      setGameStatus('won');
    }
  }, [gameStatus, targetWord]);

  /**
   * Gets the current word's definition
   * @returns {string} The definition of the current word
   */
  const getCurrentDefinition = useCallback(() => {
    if (!currentWord || !(currentWord in sampleDictionary)) {
      return '';
    }
    return sampleDictionary[currentWord].definition;
  }, [currentWord]);

  /**
   * Gets the target word's definition
   * @returns {string} The definition of the target word
   */
  const getTargetDefinition = useCallback(() => {
    if (!targetWord || !(targetWord in sampleDictionary)) {
      return '';
    }
    return sampleDictionary[targetWord].definition;
  }, [targetWord]);

  /**
   * Checks if the game is won
   * @returns {boolean} True if the current word matches the target word
   */
  const isGameWon = useCallback(() => {
    return currentWord === targetWord && currentWord !== '';
  }, [currentWord, targetWord]);

  /**
   * Resets the game to idle state
   */
  const resetGame = useCallback(() => {
    setCurrentWord('');
    setTargetWord('');
    setMoveCount(0);
    setGameStatus('idle');
    setGameHistory([]);
  }, []);

  return {
    // State
    currentWord,
    targetWord,
    moveCount,
    gameStatus,
    gameHistory,
    
    // Actions
    startNewGame,
    handleWordClick,
    resetGame,
    
    // Computed values
    getCurrentDefinition,
    getTargetDefinition,
    isGameWon
  };
}; 
