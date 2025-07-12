import { isWordInDictionary, stopWords } from '../data/sampleDictionary';

/**
 * Parses a definition and identifies which words should be clickable
 * @param {string} definition - The definition text to parse
 * @returns {Array} Array of objects with word, isClickable, and originalIndex properties
 */
export const parseDefinition = (definition) => {
  // Split the definition into words while preserving punctuation
  const words = definition.split(/\b/);
  const result = [];
  
  words.forEach((word, index) => {
    const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
    
    // Check if this is a word (not punctuation or whitespace)
    if (cleanWord.length > 0) {
      const isClickable = isWordInDictionary(cleanWord) && !stopWords.has(cleanWord);
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
 * @returns {Array} Array of clickable word strings
 */
export const getClickableWords = (definition) => {
  const parsed = parseDefinition(definition);
  return parsed
    .filter(item => item.isClickable)
    .map(item => item.cleanWord);
};

/**
 * Checks if a definition contains any clickable words
 * @param {string} definition - The definition text
 * @returns {boolean} True if the definition has clickable words
 */
export const hasClickableWords = (definition) => {
  return getClickableWords(definition).length > 0;
}; 
