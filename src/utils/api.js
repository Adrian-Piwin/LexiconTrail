/**
 * API utility functions for fetching dictionary definitions
 * Uses the Free Dictionary API (dictionaryapi.dev)
 */

const API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

/**
 * Fetches a word definition from the Free Dictionary API
 * @param {string} word - The word to look up
 * @returns {Promise<Object>} Promise that resolves to the parsed definition data
 */
export const fetchDefinition = async (word) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(word.toLowerCase())}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Word not found in dictionary');
      }
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('No definition data received');
    }
    
    // Parse the API response to extract all definition texts
    const definitions = parseApiResponse(data);
    
    if (definitions.length === 0) {
      throw new Error('No usable definitions found');
    }
    
    return {
      word: word.toLowerCase(),
      definitions: definitions,
      success: true
    };
    
  } catch (error) {
    console.error(`Error fetching definition for "${word}":`, error);
    return {
      word: word.toLowerCase(),
      definition: null,
      error: error.message,
      success: false
    };
  }
};

/**
 * Parses the API response to extract all definition texts
 * @param {Array} apiData - The raw API response data
 * @returns {Array<string>} Array of definition texts or empty array if not found
 */
const parseApiResponse = (apiData) => {
  try {
    const entry = apiData[0]; // Usually just one entry
    
    if (!entry || !entry.meanings || !Array.isArray(entry.meanings)) {
      return [];
    }
    
    const definitions = [];
    
    // Extract all definitions from all meanings
    for (const meaning of entry.meanings) {
      if (meaning.definitions && Array.isArray(meaning.definitions)) {
        for (const def of meaning.definitions) {
          if (def.definition) {
            definitions.push(def.definition);
          }
        }
      }
    }
    
    return definitions;
  } catch (error) {
    console.error('Error parsing API response:', error);
    return [];
  }
};

/**
 * Checks if a word exists in the dictionary API
 * @param {string} word - The word to check
 * @returns {Promise<boolean>} Promise that resolves to true if word exists
 */
export const checkWordExists = async (word) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${encodeURIComponent(word.toLowerCase())}`);
    return response.ok;
  } catch (error) {
    console.error(`Error checking if word "${word}" exists:`, error);
    return false;
  }
};

/**
 * Fetches multiple word definitions in parallel
 * @param {Array<string>} words - Array of words to fetch
 * @returns {Promise<Array>} Promise that resolves to array of definition results
 */
export const fetchMultipleDefinitions = async (words) => {
  const promises = words.map(word => fetchDefinition(word));
  return Promise.all(promises);
}; 
