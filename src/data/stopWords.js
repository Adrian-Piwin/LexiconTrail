/**
 * Stop words that should not be clickable in definitions
 * These are common words that don't add value to the word navigation game
 */

export const stopWords = new Set([
  // Articles
  "a", "an", "the",
  
  // Conjunctions
  "and", "or", "but", "nor", "yet", "so",
  
  // Prepositions
  "in", "on", "at", "to", "for", "of", "with", "by", "from", "up", "about", "into", "through", 
  "during", "before", "after", "above", "below", "between", "among", "within", "without",
  
  // Pronouns
  "he", "she", "it", "they", "we", "you", "i", "me", "him", "her", "them", "us", "its", "his", "hers", "theirs", "ours", "yours", "mine",
  
  // Common verbs (basic forms)
  "be", "is", "are", "was", "were", "been", "being", "have", "has", "had", "do", "does", "did", "will", "would", "could", "should", "may", "might", "can", "must", "shall",
  
  // Demonstratives
  "this", "that", "these", "those",
  
  // Interrogatives
  "what", "when", "where", "who", "which", "why", "how",
  
  // Quantifiers
  "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "only", "own", "same", "so", "than", "too", "very",
  
  // Numbers and basic words
  "one", "two", "three", "first", "last", "next", "previous", "many", "much", "little", "big", "small", "large", "high", "low", "good", "bad", "new", "old", "young", "early", "late", "long", "short", "right", "left", "different", "same", "important", "public", "able", "better", "best", "free"
]);

/**
 * Checks if a word is a stop word
 * @param {string} word - The word to check
 * @returns {boolean} True if the word is a stop word
 */
export const isStopWord = (word) => {
  return stopWords.has(word.toLowerCase());
};

/**
 * Filters out stop words from an array of words
 * @param {Array<string>} words - Array of words to filter
 * @returns {Array<string>} Array with stop words removed
 */
export const filterStopWords = (words) => {
  return words.filter(word => !isStopWord(word));
}; 
