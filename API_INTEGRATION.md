# API Integration Documentation

## Overview
The Lexicon Trail game has been upgraded to use real dictionary definitions from the Free Dictionary API (dictionaryapi.dev) instead of hardcoded sample data.

## Key Changes

### 1. API Integration (`src/utils/api.js`)
- **`fetchDefinition(word)`**: Fetches definition from Free Dictionary API
- **`parseApiResponse(data)`**: Parses API response to extract definition text
- **`checkWordExists(word)`**: Checks if a word exists in the API
- **`fetchMultipleDefinitions(words)`**: Fetches multiple definitions in parallel

### 2. Seed Words (`src/data/seedWords.js`)
- Curated list of common words known to exist in the dictionary API
- Used for reliable start/target word selection
- Prevents errors from choosing non-existent words

### 3. Updated Game State (`src/hooks/useApiGameState.js`)
- Replaces `useGameState` with API-aware version
- Handles loading states and error messages
- Caches definitions to avoid repeated API calls
- Manages available words for clickable links

### 4. Enhanced UI Components
- **Loading Spinner**: Visual feedback during API calls
- **Error Messages**: User-friendly error handling
- **Disabled States**: Prevents actions during loading

## API Response Format
The Free Dictionary API returns data in this format:
```json
[
  {
    "word": "apple",
    "meanings": [
      {
        "partOfSpeech": "noun",
        "definitions": [
          {
            "definition": "A common, round fruit produced by the tree Malus domestica..."
          }
        ]
      }
    ]
  }
]
```

## Error Handling
- **404 Errors**: Word not found in dictionary
- **Network Errors**: Connection issues
- **Parse Errors**: Invalid API response format
- **Empty Definitions**: No usable definition found

## Caching Strategy
- Definitions are cached in memory to avoid repeated API calls
- Available words are tracked to determine clickable links
- Cache persists for the duration of the game session

## Performance Optimizations
- Parallel fetching of start/target definitions
- Cached definitions for instant navigation
- Loading states to prevent multiple simultaneous requests

## Usage
1. Click "Start New Game" to begin with random start/target words
2. Click any clickable word in the current definition to navigate
3. Reach the target word to win the game
4. Error messages provide guidance for failed requests

## Testing
The integration includes console logging for debugging:
- API request/response logging
- Definition parsing results
- Game state transitions 
