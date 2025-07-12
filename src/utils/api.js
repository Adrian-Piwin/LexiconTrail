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
    
    // Parse the API response to extract the definition text
    const definition = parseApiResponse(data);
    
    if (!definition) {
      throw new Error('No usable definition found');
    }
    
    return {
      word: word.toLowerCase(),
      definition: definition,
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
 * Parses the API response to extract the definition text
 * @param {Array} apiData - The raw API response data
 * @returns {string|null} The extracted definition text or null if not found
 */
const parseApiResponse = (apiData) => {
  try {
    const entry = apiData[0]; // Usually just one entry
    
    if (!entry || !entry.meanings || !Array.isArray(entry.meanings)) {
      return null;
    }
    
    // Find the first meaning with a definition
    for (const meaning of entry.meanings) {
      if (meaning.definitions && Array.isArray(meaning.definitions) && meaning.definitions.length > 0) {
        // Return the first definition
        return meaning.definitions[0].definition;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing API response:', error);
    return null;
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
