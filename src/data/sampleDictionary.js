// Sample dictionary data with cross-linked definitions
// Each definition contains words that exist in our dictionary to enable navigation

export const sampleDictionary = {
  "computer": {
    definition: "An electronic device that processes data and performs calculations using programs and software.",
    category: "technology"
  },
  "software": {
    definition: "Programs and applications that run on a computer to perform specific tasks.",
    category: "technology"
  },
  "program": {
    definition: "A set of instructions that tells a computer how to perform a task or solve a problem.",
    category: "technology"
  },
  "data": {
    definition: "Information stored and processed by computers, including text, numbers, and images.",
    category: "technology"
  },
  "information": {
    definition: "Knowledge or facts that are communicated or received about a particular subject.",
    category: "general"
  },
  "knowledge": {
    definition: "Facts, information, and skills acquired through experience or education.",
    category: "general"
  },
  "education": {
    definition: "The process of teaching and learning to acquire knowledge and develop skills.",
    category: "general"
  },
  "learning": {
    definition: "The acquisition of knowledge or skills through study, experience, or teaching.",
    category: "general"
  },
  "study": {
    definition: "The process of learning about a subject through reading, research, and practice.",
    category: "general"
  },
  "research": {
    definition: "Systematic investigation to discover facts and reach new conclusions.",
    category: "general"
  },
  "investigation": {
    definition: "A detailed examination to discover facts and information about something.",
    category: "general"
  },
  "examination": {
    definition: "A detailed inspection or analysis of something to understand its nature.",
    category: "general"
  },
  "analysis": {
    definition: "The process of examining something in detail to understand its structure or meaning.",
    category: "general"
  },
  "process": {
    definition: "A series of actions or steps taken to achieve a particular result.",
    category: "general"
  },
  "action": {
    definition: "Something done to achieve a purpose or result.",
    category: "general"
  },
  "purpose": {
    definition: "The reason for which something exists or is done.",
    category: "general"
  },
  "reason": {
    definition: "A cause, explanation, or justification for an action or event.",
    category: "general"
  },
  "cause": {
    definition: "Something that produces an effect or result.",
    category: "general"
  },
  "effect": {
    definition: "A change that results from an action or cause.",
    category: "general"
  },
  "change": {
    definition: "The act or process of becoming different or making something different.",
    category: "general"
  }
};

// Stop words that should not be clickable
export const stopWords = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "he", 
  "in", "is", "it", "its", "of", "on", "that", "the", "to", "was", "will", 
  "with", "or", "but", "not", "this", "they", "have", "had", "what", "when", 
  "where", "who", "which", "why", "how", "all", "any", "both", "each", "few", 
  "more", "most", "other", "some", "such", "no", "nor", "only", "own", "same", 
  "so", "than", "too", "very", "can", "may", "must", "shall", "should", "would"
]);

// Utility function to get all available words
export const getAvailableWords = () => Object.keys(sampleDictionary);

// Utility function to check if a word exists in our dictionary
export const isWordInDictionary = (word) => {
  return word.toLowerCase() in sampleDictionary;
};

// Utility function to get a random word from the dictionary
export const getRandomWord = () => {
  const words = getAvailableWords();
  return words[Math.floor(Math.random() * words.length)];
};

// Utility function to get two different random words
export const getRandomStartAndTarget = () => {
  const words = getAvailableWords();
  const startIndex = Math.floor(Math.random() * words.length);
  let targetIndex = Math.floor(Math.random() * words.length);
  
  // Ensure start and target are different
  while (targetIndex === startIndex) {
    targetIndex = Math.floor(Math.random() * words.length);
  }
  
  return {
    start: words[startIndex],
    target: words[targetIndex]
  };
}; 
