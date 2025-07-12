# Lexicon Trail

A React-based word navigation game that uses real dictionary definitions from the Free Dictionary API. Navigate from a start word to a target word by clicking on words within definitions.

## How to Play

1. **Start a Game**: Click "Start New Game" to get a random start word and target word
2. **Navigate**: Click on any clickable word in the current word's definition to move to that word
3. **Goal**: Reach the target word by clicking through definitions
4. **Win**: When you reach the target word, you win! The game shows your path and move count

## Features

- **Real Dictionary Definitions**: Uses the Free Dictionary API (dictionaryapi.dev) for live definitions
- **Dynamic Word Detection**: Automatically identifies which words in definitions exist in the API
- **Smart Filtering**: Excludes stop words (like "the", "and", "is") and the current word from being clickable
- **Move Counter**: Tracks how many moves you've made
- **Path History**: Shows your navigation path through the words
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Graceful handling of API failures with retry options
- **Responsive Design**: Works on desktop and mobile devices
- **Clean UI**: Modern, intuitive interface with smooth animations

## Game Mechanics

- **API-Powered**: Real definitions fetched from dictionaryapi.dev
- **Clickable Words**: Words in definitions that exist in the API are highlighted and clickable
- **Stop Words**: Common words like "the", "and", "is" are filtered out and not clickable
- **Current Word Exclusion**: The word being defined is excluded from being clickable in its own definition
- **Seed Words**: Uses a curated list of common words known to exist in the API for reliable start/target selection
- **Caching**: Definitions are cached to avoid repeated API calls
- **Win Condition**: Reaching the target word triggers the win state

## Technical Architecture

The project follows a modern React architecture with API integration:

### API Integration (`src/utils/`)
- `api.js`: Handles all Free Dictionary API calls with error handling and response parsing
- `definitionParser.js`: Parses definitions and identifies clickable words, excluding stop words and current word

### Data Management (`src/data/`)
- `seedWords.js`: Curated list of 100+ common words known to exist in the API
- `stopWords.js`: Comprehensive list of stop words organized by category (articles, conjunctions, prepositions, etc.)

### State Management (`src/hooks/`)
- `useApiGameState.js`: Custom hook managing game state with API integration
  - Handles loading states and error messages
  - Caches definitions to avoid repeated API calls
  - Manages available words for clickable links
  - Checks words in definitions against the API

### Components (`src/components/`)
- `Game.js`: Main game component handling all game states and API interactions
- `ClickableDefinition.js`: Renders definitions with clickable words
- `CurrentWord.js`: Displays the current word and its definition
- `StartTarget.js`: Shows start and target words
- `LoadingSpinner.js`: Visual feedback during API calls
- `Trail.js`: Displays navigation history
- `Header.js`: Game header with title and info button
- `InstructionsModal.js`: Game instructions modal

### Styling
- Responsive CSS with mobile-first design
- Glass morphism effects and modern UI elements
- Loading states and error message styling

## API Integration Details

### Free Dictionary API
- **Endpoint**: `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`
- **No API Key Required**: Free to use for prototyping
- **Response Format**: JSON array with word definitions, meanings, and metadata

### Word Detection Process
1. **Extract Words**: Parse definition text to extract individual words
2. **Filter Stop Words**: Remove common words that don't add value to navigation
3. **API Validation**: Check each word against the dictionary API
4. **Cache Results**: Store definitions to avoid repeated API calls
5. **Make Clickable**: Only words that exist in the API become clickable

### Performance Optimizations
- **Definition Caching**: Avoids repeated API calls for the same word
- **Batch Processing**: Limits API calls to prevent overwhelming the service
- **Parallel Requests**: Fetches start/target definitions simultaneously
- **Smart Filtering**: Only checks meaningful words (excludes stop words)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Error Handling

The game gracefully handles various error scenarios:
- **404 Errors**: Word not found in dictionary
- **Network Errors**: Connection issues with retry options
- **Parse Errors**: Invalid API response format
- **Empty Definitions**: No usable definition found

## Technologies Used

- **React 19**: Modern React with hooks and functional components
- **Free Dictionary API**: Real dictionary definitions from dictionaryapi.dev
- **CSS3**: Modern features including Grid, Flexbox, and custom properties
- **Custom Hooks**: State management and API integration
- **Responsive Design**: Mobile-first approach with breakpoints
