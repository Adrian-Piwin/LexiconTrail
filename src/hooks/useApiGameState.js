import { useState, useCallback } from 'react';
import { fetchDefinition } from '../utils/api';
import { getRandomStartAndTarget } from '../data/seedWords';

/**
 * Custom hook to manage the game state with API integration
 * Handles starting new games, tracking moves, fetching definitions, and checking win conditions
 */
export const useApiGameState = () => {
  // Game state
  const [currentWord, setCurrentWord] = useState('');
  const [targetWord, setTargetWord] = useState('');
  const [moveCount, setMoveCount] = useState(0);
  const [gameStatus, setGameStatus] = useState('idle'); // 'idle', 'playing', 'won'
  const [gameHistory, setGameHistory] = useState([]);
  
  // API state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentDefinition, setCurrentDefinition] = useState('');
  const [targetDefinition, setTargetDefinition] = useState('');
  
  // Cache for definitions to avoid repeated API calls
  const [definitionCache, setDefinitionCache] = useState(new Map());
  const [availableWords, setAvailableWords] = useState(new Set());

  /**
   * Fetches a definition and caches it
   * @param {string} word - The word to fetch definition for
   * @returns {Promise<string|null>} The definition text or null if failed
   */
  const fetchAndCacheDefinition = useCallback(async (word) => {
    if (!word) return null;
    
    const cleanWord = word.toLowerCase();
    
    // Check cache first
    if (definitionCache.has(cleanWord)) {
      return definitionCache.get(cleanWord);
    }
    
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const result = await fetchDefinition(cleanWord);
      
      if (result.success && result.definition) {
        // Cache the definition
        setDefinitionCache(prev => new Map(prev).set(cleanWord, result.definition));
        
        // Add word to available words set
        setAvailableWords(prev => new Set(prev).add(cleanWord));
        
        return result.definition;
      } else {
        throw new Error(result.error || 'Failed to fetch definition');
      }
    } catch (error) {
      console.error(`Error fetching definition for "${cleanWord}":`, error);
      setErrorMessage(`No definition found for "${cleanWord}". Please choose another word.`);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [definitionCache]);

  /**
   * Checks which words in a definition exist in the API and updates available words
   * @param {string} definition - The definition text to analyze
   * @returns {Promise<Set>} Set of words that exist in the API
   */
  const checkWordsInDefinition = useCallback(async (definition) => {
    if (!definition) return new Set();
    
    // Extract all words from the definition
    const words = definition.toLowerCase().match(/\b[a-z]+\b/g) || [];
    const uniqueWords = [...new Set(words)];
    
    // Filter out stop words
    const { stopWords } = await import('../data/stopWords');
    const filteredWords = uniqueWords.filter(word => !stopWords.has(word));
    
    // Check each word against the API (limit to first 10 words to avoid too many requests)
    const wordsToCheck = filteredWords.slice(0, 10);
    const existingWords = new Set();
    
    // Check words that are already cached
    for (const word of wordsToCheck) {
      if (definitionCache.has(word)) {
        existingWords.add(word);
      }
    }
    
    // Check remaining words against the API
    const uncachedWords = wordsToCheck.filter(word => !definitionCache.has(word));
    
    if (uncachedWords.length > 0) {
      // Make API calls in parallel (but limit to 5 at a time to be respectful)
      const batchSize = 5;
      for (let i = 0; i < uncachedWords.length; i += batchSize) {
        const batch = uncachedWords.slice(i, i + batchSize);
        const promises = batch.map(async (word) => {
          try {
            const result = await fetchDefinition(word);
            if (result.success) {
              // Cache the definition for future use
              setDefinitionCache(prev => new Map(prev).set(word, result.definition));
              return word;
            }
          } catch (error) {
            // Word doesn't exist in API, skip it
            console.log(`Word "${word}" not found in API`);
          }
          return null;
        });
        
        const results = await Promise.all(promises);
        results.forEach(word => {
          if (word) {
            existingWords.add(word);
          }
        });
      }
    }
    
    // Update available words set
    setAvailableWords(prev => new Set([...prev, ...existingWords]));
    
    console.log(`Found ${existingWords.size} clickable words in definition:`, Array.from(existingWords));
    
    return existingWords;
  }, [definitionCache]);

  /**
   * Starts a new game with random start and target words
   */
  const startNewGame = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const { start, target } = getRandomStartAndTarget();
      
      // Fetch definitions for both start and target words
      const [startDefinition, targetDefinition] = await Promise.all([
        fetchAndCacheDefinition(start),
        fetchAndCacheDefinition(target)
      ]);
      
      if (!startDefinition || !targetDefinition) {
        throw new Error('Failed to fetch definitions for start or target word');
      }
      
      // Check which words in the start definition exist in the API
      await checkWordsInDefinition(startDefinition);
      
      setCurrentWord(start);
      setTargetWord(target);
      setCurrentDefinition(startDefinition);
      setTargetDefinition(targetDefinition);
      setMoveCount(0);
      setGameStatus('playing');
      setGameHistory([start]);
      
    } catch (error) {
      console.error('Error starting new game:', error);
      setErrorMessage('Failed to start new game. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [fetchAndCacheDefinition, checkWordsInDefinition]);

  /**
   * Handles clicking on a word in the definition
   * @param {string} clickedWord - The word that was clicked
   */
  const handleWordClick = useCallback(async (clickedWord) => {
    if (gameStatus !== 'playing' || isLoading) return;
    
    const cleanWord = clickedWord.toLowerCase();
    
    // Check if we already have this word cached
    if (definitionCache.has(cleanWord)) {
      const definition = definitionCache.get(cleanWord);
      
      // Check which words in the definition exist in the API
      await checkWordsInDefinition(definition);
      
      // Update game state immediately
      setCurrentWord(cleanWord);
      setCurrentDefinition(definition);
      setMoveCount(prev => prev + 1);
      setGameHistory(prev => [...prev, cleanWord]);
      
      // Check for win condition
      if (cleanWord === targetWord) {
        setGameStatus('won');
      }
      return;
    }
    
    // Fetch the definition
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const definition = await fetchAndCacheDefinition(cleanWord);
      
      if (definition) {
        // Check which words in the definition exist in the API
        await checkWordsInDefinition(definition);
        
        // Update game state
        setCurrentWord(cleanWord);
        setCurrentDefinition(definition);
        setMoveCount(prev => prev + 1);
        setGameHistory(prev => [...prev, cleanWord]);
        
        // Check for win condition
        if (cleanWord === targetWord) {
          setGameStatus('won');
        }
      }
    } catch (error) {
      console.error(`Error handling word click for "${cleanWord}":`, error);
      setErrorMessage(`Failed to fetch definition for "${cleanWord}". Please try another word.`);
    } finally {
      setIsLoading(false);
    }
  }, [gameStatus, isLoading, targetWord, definitionCache, fetchAndCacheDefinition, checkWordsInDefinition]);

  /**
   * Gets the current word's definition
   * @returns {string} The definition of the current word
   */
  const getCurrentDefinition = useCallback(() => {
    return currentDefinition;
  }, [currentDefinition]);

  /**
   * Gets the target word's definition
   * @returns {string} The definition of the target word
   */
  const getTargetDefinition = useCallback(() => {
    return targetDefinition;
  }, [targetDefinition]);

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
    setCurrentDefinition('');
    setTargetDefinition('');
    setMoveCount(0);
    setGameStatus('idle');
    setGameHistory([]);
    setErrorMessage('');
    setIsLoading(false);
  }, []);

  /**
   * Clears the definition cache
   */
  const clearCache = useCallback(() => {
    setDefinitionCache(new Map());
    setAvailableWords(new Set());
  }, []);

  return {
    // State
    currentWord,
    targetWord,
    moveCount,
    gameStatus,
    gameHistory,
    isLoading,
    errorMessage,
    currentDefinition,
    targetDefinition,
    availableWords,
    
    // Actions
    startNewGame,
    handleWordClick,
    resetGame,
    clearCache,
    
    // Computed values
    getCurrentDefinition,
    getTargetDefinition,
    isGameWon
  };
}; 
