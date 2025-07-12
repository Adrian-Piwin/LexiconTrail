import { stopWords } from '../data/sampleDictionary';

console.log('Stop words loaded:', Array.from(stopWords));

/**
 * Parses a definition and identifies which words should be clickable
 * @param {string} definition - The definition text to parse
 * @param {Set} availableWords - Set of words that are available for clicking
 * @returns {Array} Array of objects with word, isClickable, and originalIndex properties
 */
export const parseDefinition = (definition, availableWords = new Set()) => {
  // Split the definition into words while preserving punctuation
  const words = definition.split(/\b/);
  const result = [];
  
  console.log('Parsing definition:', definition);
  console.log('Available words:', Array.from(availableWords));
  
  words.forEach((word, index) => {
    const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
    
    // Check if this is a word (not punctuation or whitespace)
    if (cleanWord.length > 0) {
      const isClickable = availableWords.has(cleanWord) && !stopWords.has(cleanWord);
      if (isClickable) {
        console.log(`Making "${cleanWord}" clickable`);
      }
      result.push({
        word: word,
        cleanWord: cleanWord,
        isClickable: isClickable,
        originalIndex: index
      });
    } else {
      // Handle punctuation and whitespace
      result.push({
        word: word,
        cleanWord: cleanWord,
        isClickable: false,
        originalIndex: index
      });
    }
  });
  
  return result;
};

/**
 * Extracts all clickable words from a definition
 * @param {string} definition - The definition text
 * @param {Set} availableWords - Set of words that are available for clicking
 * @returns {Array} Array of clickable word strings
 */
export const getClickableWords = (definition, availableWords = new Set()) => {
  const parsed = parseDefinition(definition, availableWords);
  return parsed
    .filter(item => item.isClickable)
    .map(item => item.cleanWord);
};

/**
 * Checks if a definition contains any clickable words
 * @param {string} definition - The definition text
 * @param {Set} availableWords - Set of words that are available for clicking
 * @returns {boolean} True if the definition has clickable words
 */
export const hasClickableWords = (definition, availableWords = new Set()) => {
  return getClickableWords(definition, availableWords).length > 0;
}; 
