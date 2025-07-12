# Lexicon Trail

A React-based word navigation game inspired by the Wikipedia game, but using dictionary definitions instead of encyclopedia articles.

## How to Play

1. **Start a Game**: Click "Start New Game" to get a random start word and target word
2. **Navigate**: Click on any clickable word in the current word's definition to move to that word
3. **Goal**: Reach the target word by clicking through definitions
4. **Win**: When you reach the target word, you win! The game shows your path and move count

## Features

- **Cross-linked Definitions**: Each definition contains words that exist in our dictionary, enabling navigation
- **Move Counter**: Tracks how many moves you've made
- **Path History**: Shows your navigation path through the words
- **Responsive Design**: Works on desktop and mobile devices
- **Clean UI**: Modern, intuitive interface with smooth animations

## Game Mechanics

- **Clickable Words**: Words in definitions that exist in our dictionary are highlighted and clickable
- **Stop Words**: Common words like "the", "and", "is" are filtered out and not clickable
- **Random Start/Target**: Each new game provides different start and target words
- **Win Condition**: Reaching the target word triggers the win state

## Technical Architecture

The project follows an MVC-inspired architecture:

### Model/Data (`src/data/`)
- `sampleDictionary.js`: Hardcoded dictionary with cross-linked definitions
- Stop words filtering utilities
- Random word selection functions

### View/Components (`src/components/`)
- `Game.js`: Main game component handling all game states
- `ClickableDefinition.js`: Renders definitions with clickable words
- Responsive CSS styling

### Controller/State Management (`src/hooks/`)
- `useGameState.js`: Custom hook managing game state and logic
- Handles game flow, move tracking, and win conditions

### Utilities (`src/utils/`)
- `definitionParser.js`: Parses definitions and identifies clickable words

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

## Sample Dictionary

The game currently uses a hardcoded dictionary with 20 words that are cross-linked to enable navigation. Each definition contains words that exist in our dictionary, creating a web of connections that players can navigate through.

## Future Enhancements

- Integration with real dictionary APIs
- User accounts and leaderboards
- Different difficulty levels
- Themed word sets
- Multiplayer functionality
- Advanced pathfinding algorithms

## Technologies Used

- React 19
- CSS3 with modern features (Grid, Flexbox, Gradients)
- Custom hooks for state management
- Responsive design principles 
