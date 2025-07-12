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
  const [currentDefinitions, setCurrentDefinitions] = useState([]);
  const [targetDefinitions, setTargetDefinitions] = useState([]);
  
  // Cache for definitions to avoid repeated API calls
  const [definitionCache, setDefinitionCache] = useState(new Map());
  const [availableWords, setAvailableWords] = useState(new Set());

  /**
   * Fetches definitions and caches them
   * @param {string} word - The word to fetch definitions for
   * @returns {Promise<Array<string>|null>} Array of definition texts or null if failed
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
      
      if (result.success && result.definitions && result.definitions.length > 0) {
        // Cache the definitions
        setDefinitionCache(prev => new Map(prev).set(cleanWord, result.definitions));
        
        // Add word to available words set
        setAvailableWords(prev => new Set(prev).add(cleanWord));
        
        return result.definitions;
      } else {
        throw new Error(result.error || 'Failed to fetch definitions');
      }
    } catch (error) {
      console.error(`Error fetching definitions for "${cleanWord}":`, error);
      setErrorMessage(`No definitions found for "${cleanWord}". Please choose another word.`);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [definitionCache]);

  /**
   * Checks which words in definitions exist in the API and updates available words
   * @param {Array<string>} definitions - Array of definition texts to analyze
   * @returns {Promise<Set>} Set of words that exist in the API
   */
  const checkWordsInDefinitions = useCallback(async (definitions) => {
    if (!definitions || definitions.length === 0) return new Set();
    
    const allExistingWords = new Set();
    
    // Process each definition
    for (const definition of definitions) {
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
                // Cache the definitions for future use
                setDefinitionCache(prev => new Map(prev).set(word, result.definitions));
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
      
      // Add words from this definition to the overall set
      existingWords.forEach(word => allExistingWords.add(word));
    }
    
    // Update available words set
    setAvailableWords(prev => new Set([...prev, ...allExistingWords]));
    
    console.log(`Found ${allExistingWords.size} clickable words in definitions:`, Array.from(allExistingWords));
    
    return allExistingWords;
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
      const [startDefinitions, targetDefinitions] = await Promise.all([
        fetchAndCacheDefinition(start),
        fetchAndCacheDefinition(target)
      ]);
      
      if (!startDefinitions || !targetDefinitions) {
        throw new Error('Failed to fetch definitions for start or target word');
      }
      
      // Check which words in the start definitions exist in the API
      await checkWordsInDefinitions(startDefinitions);
      
      setCurrentWord(start);
      setTargetWord(target);
      setCurrentDefinitions(startDefinitions);
      setTargetDefinitions(targetDefinitions);
      setMoveCount(0);
      setGameStatus('playing');
      setGameHistory([start]);
      
    } catch (error) {
      console.error('Error starting new game:', error);
      setErrorMessage('Failed to start new game. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [fetchAndCacheDefinition, checkWordsInDefinitions]);

  /**
   * Handles clicking on a word in the definition
   * @param {string} clickedWord - The word that was clicked
   */
  const handleWordClick = useCallback(async (clickedWord) => {
    if (gameStatus !== 'playing' || isLoading) return;
    
    const cleanWord = clickedWord.toLowerCase();
    
    // Check if we already have this word cached
    if (definitionCache.has(cleanWord)) {
      const definitions = definitionCache.get(cleanWord);
      
      // Check which words in the definitions exist in the API
      await checkWordsInDefinitions(definitions);
      
      // Update game state immediately
      setCurrentWord(cleanWord);
      setCurrentDefinitions(definitions);
      setMoveCount(prev => prev + 1);
      setGameHistory(prev => [...prev, cleanWord]);
      
      // Check for win condition
      if (cleanWord === targetWord) {
        setGameStatus('won');
      }
      return;
    }
    
    // Fetch the definitions
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const definitions = await fetchAndCacheDefinition(cleanWord);
      
      if (definitions) {
        // Check which words in the definitions exist in the API
        await checkWordsInDefinitions(definitions);
        
        // Update game state
        setCurrentWord(cleanWord);
        setCurrentDefinitions(definitions);
        setMoveCount(prev => prev + 1);
        setGameHistory(prev => [...prev, cleanWord]);
        
        // Check for win condition
        if (cleanWord === targetWord) {
          setGameStatus('won');
        }
      }
    } catch (error) {
      console.error(`Error handling word click for "${cleanWord}":`, error);
      setErrorMessage(`Failed to fetch definitions for "${cleanWord}". Please try another word.`);
    } finally {
      setIsLoading(false);
    }
  }, [gameStatus, isLoading, targetWord, definitionCache, fetchAndCacheDefinition, checkWordsInDefinitions]);

  /**
   * Gets the current word's definitions
   * @returns {Array<string>} The definitions of the current word
   */
  const getCurrentDefinitions = useCallback(() => {
    return currentDefinitions;
  }, [currentDefinitions]);

  /**
   * Gets the target word's definitions
   * @returns {Array<string>} The definitions of the target word
   */
  const getTargetDefinitions = useCallback(() => {
    return targetDefinitions;
  }, [targetDefinitions]);

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
    setCurrentDefinitions([]);
    setTargetDefinitions([]);
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
    currentDefinitions,
    targetDefinitions,
    availableWords,
    
    // Actions
    startNewGame,
    handleWordClick,
    resetGame,
    clearCache,
    
    // Computed values
    getCurrentDefinitions,
    getTargetDefinitions,
    isGameWon
  };
}; 
