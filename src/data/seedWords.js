/**
 * Seed words that are known to exist in the Free Dictionary API
 * These words are used for reliable start/target word selection
 */

export const seedWords = [
  // Common nouns
  "apple", "book", "car", "dog", "house", "tree", "water", "food", "time", "work",
  "people", "way", "day", "year", "thing", "world", "life", "hand", "eye", "man",
  "woman", "child", "school", "city", "country", "family", "friend", "money", "job",
  "problem", "question", "idea", "story", "game", "music", "art", "science", "history",
  
  // Common verbs
  "be", "have", "do", "say", "get", "make", "go", "know", "take", "see", "come", "think",
  "look", "want", "give", "use", "find", "tell", "ask", "work", "seem", "feel", "try",
  "leave", "call", "play", "read", "write", "run", "walk", "talk", "listen", "watch",
  
  // Common adjectives
  "good", "new", "first", "last", "long", "great", "little", "own", "other", "old",
  "right", "big", "high", "different", "small", "large", "next", "early", "young",
  "important", "few", "public", "bad", "same", "able", "better", "best", "free",
  
  // Technology and modern words
  "computer", "internet", "phone", "email", "website", "software", "data", "information",
  "system", "program", "network", "digital", "online", "mobile", "screen", "device",
  "application", "database", "server", "cloud", "security", "password", "user",
  
  // Nature and environment
  "nature", "environment", "weather", "climate", "earth", "sun", "moon", "star",
  "ocean", "river", "mountain", "forest", "animal", "plant", "flower", "bird",
  "fish", "insect", "grass", "soil", "air", "wind", "rain", "snow", "fire"
];

/**
 * Gets a random word from the seed words list
 * @returns {string} A random seed word
 */
export const getRandomSeedWord = () => {
  return seedWords[Math.floor(Math.random() * seedWords.length)];
};

/**
 * Gets two different random words from the seed words list
 * @returns {Object} Object with start and target properties
 */
export const getRandomStartAndTarget = () => {
  const startIndex = Math.floor(Math.random() * seedWords.length);
  let targetIndex = Math.floor(Math.random() * seedWords.length);
  
  // Ensure start and target are different
  while (targetIndex === startIndex) {
    targetIndex = Math.floor(Math.random() * seedWords.length);
  }
  
  return {
    start: seedWords[startIndex],
    target: seedWords[targetIndex]
  };
};

/**
 * Checks if a word is in our seed words list
 * @param {string} word - The word to check
 * @returns {boolean} True if the word is in the seed list
 */
export const isSeedWord = (word) => {
  return seedWords.includes(word.toLowerCase());
}; 
