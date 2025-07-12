/**
 * Comprehensive seed words that are known to exist in the Free Dictionary API
 * These words are used for reliable start/target word selection
 * Organized by categories for easy maintenance and expansion
 */

// Common nouns - everyday objects and concepts
const commonNouns = [
  "apple", "book", "car", "dog", "house", "tree", "water", "food", "time", "work",
  "people", "way", "day", "year", "thing", "world", "life", "hand", "eye", "man",
  "woman", "child", "school", "city", "country", "family", "friend", "money", "job",
  "problem", "question", "idea", "story", "game", "music", "art", "science", "history",
  "door", "window", "table", "chair", "bed", "room", "kitchen", "bathroom", "garden",
  "street", "road", "bridge", "building", "office", "shop", "market", "hospital",
  "library", "museum", "park", "beach", "mountain", "river", "lake", "sea", "island",
  "phone", "computer", "television", "radio", "camera", "clock", "watch", "key",
  "bag", "shoes", "clothes", "hat", "glasses", "ring", "necklace", "wallet", "card",
  "paper", "pen", "pencil", "notebook", "dictionary", "magazine", "newspaper", "letter",
  "picture", "photo", "map", "calendar", "mirror", "lamp", "candle", "fire", "light",
  "shadow", "color", "shape", "size", "weight", "height", "width", "length", "distance"
];

// Common verbs - actions and states
const commonVerbs = [
  "be", "have", "do", "say", "get", "make", "go", "know", "take", "see", "come", "think",
  "look", "want", "give", "use", "find", "tell", "ask", "work", "seem", "feel", "try",
  "leave", "call", "play", "read", "write", "run", "walk", "talk", "listen", "watch",
  "eat", "drink", "sleep", "wake", "stand", "sit", "lie", "jump", "dance", "sing",
  "laugh", "cry", "smile", "frown", "kiss", "hug", "hold", "carry", "push", "pull",
  "open", "close", "start", "stop", "begin", "end", "finish", "continue", "break",
  "fix", "build", "create", "destroy", "change", "move", "turn", "return", "arrive",
  "leave", "enter", "exit", "climb", "fall", "rise", "grow", "shrink", "expand",
  "contract", "increase", "decrease", "improve", "worsen", "help", "hurt", "save",
  "waste", "buy", "sell", "pay", "cost", "earn", "spend", "save", "lose", "win"
];

// Common adjectives - descriptive words
const commonAdjectives = [
  "good", "new", "first", "last", "long", "great", "little", "own", "other", "old",
  "right", "big", "high", "different", "small", "large", "next", "early", "young",
  "important", "few", "public", "bad", "same", "able", "better", "best", "free",
  "hot", "cold", "warm", "cool", "soft", "hard", "smooth", "rough", "clean", "dirty",
  "wet", "dry", "full", "empty", "heavy", "light", "strong", "weak", "fast", "slow",
  "loud", "quiet", "bright", "dark", "clear", "fuzzy", "sharp", "dull", "fresh", "stale",
  "sweet", "sour", "bitter", "spicy", "salty", "tasty", "delicious", "awful", "beautiful",
  "ugly", "pretty", "handsome", "cute", "lovely", "wonderful", "terrible", "amazing",
  "horrible", "excellent", "perfect", "awful", "nice", "kind", "mean", "friendly",
  "angry", "happy", "sad", "excited", "bored", "tired", "energetic", "calm", "nervous"
];

// Technology and modern words
const technologyWords = [
  "computer", "internet", "phone", "email", "website", "software", "data", "information",
  "system", "program", "network", "digital", "online", "mobile", "screen", "device",
  "application", "database", "server", "cloud", "security", "password", "user",
  "algorithm", "code", "programming", "developer", "engineer", "designer", "analyst",
  "interface", "platform", "service", "api", "framework", "library", "tool", "utility",
  "browser", "search", "download", "upload", "stream", "buffer", "cache", "memory",
  "processor", "hardware", "peripheral", "keyboard", "mouse", "monitor", "printer",
  "scanner", "speaker", "microphone", "camera", "sensor", "wireless", "bluetooth",
  "wifi", "ethernet", "fiber", "satellite", "antenna", "signal", "frequency", "bandwidth"
];

// Nature and environment
const natureWords = [
  "nature", "environment", "weather", "climate", "earth", "sun", "moon", "star",
  "ocean", "river", "mountain", "forest", "animal", "plant", "flower", "bird",
  "fish", "insect", "grass", "soil", "air", "wind", "rain", "snow", "fire",
  "tree", "bush", "leaf", "root", "seed", "fruit", "vegetable", "herb", "spice",
  "mammal", "reptile", "amphibian", "crustacean", "mollusk", "arachnid", "butterfly",
  "bee", "ant", "spider", "snake", "lizard", "turtle", "frog", "toad", "salamander",
  "whale", "dolphin", "shark", "octopus", "crab", "lobster", "clam", "oyster",
  "eagle", "hawk", "owl", "crow", "sparrow", "robin", "cardinal", "bluejay", "penguin",
  "lion", "tiger", "bear", "wolf", "fox", "deer", "rabbit", "squirrel", "chipmunk",
  "desert", "jungle", "savanna", "tundra", "swamp", "marsh", "pond", "stream", "creek",
  "volcano", "canyon", "valley", "hill", "cliff", "cave", "spring", "waterfall", "geyser"
];

// Food and cooking
const foodWords = [
  "food", "meal", "breakfast", "lunch", "dinner", "snack", "dessert", "appetizer",
  "bread", "rice", "pasta", "noodle", "potato", "tomato", "onion", "garlic", "carrot",
  "lettuce", "spinach", "kale", "cabbage", "broccoli", "cauliflower", "pepper", "cucumber",
  "apple", "banana", "orange", "grape", "strawberry", "blueberry", "raspberry", "peach",
  "pear", "plum", "cherry", "lemon", "lime", "grapefruit", "pineapple", "mango", "papaya",
  "meat", "beef", "pork", "chicken", "turkey", "lamb", "fish", "shrimp", "crab", "lobster",
  "egg", "milk", "cheese", "yogurt", "butter", "cream", "sugar", "salt", "pepper", "spice",
  "herb", "basil", "oregano", "thyme", "rosemary", "sage", "mint", "cinnamon", "nutmeg",
  "cook", "bake", "fry", "grill", "roast", "boil", "steam", "sauté", "stir", "mix"
];

// Transportation and travel
const transportationWords = [
  "car", "truck", "bus", "train", "plane", "boat", "ship", "bicycle", "motorcycle",
  "scooter", "skateboard", "rollerblade", "wagon", "cart", "wheelbarrow", "tractor",
  "helicopter", "jet", "rocket", "submarine", "canoe", "kayak", "raft", "sailboat",
  "ferry", "cruise", "taxi", "limousine", "ambulance", "firetruck", "police", "tank",
  "road", "street", "highway", "freeway", "bridge", "tunnel", "intersection", "traffic",
  "signal", "light", "sign", "map", "compass", "gps", "navigation", "direction",
  "travel", "journey", "trip", "vacation", "holiday", "tour", "visit", "explore",
  "destination", "location", "place", "spot", "area", "region", "country", "state",
  "city", "town", "village", "neighborhood", "district", "zone", "territory"
];

// Sports and recreation
const sportsWords = [
  "sport", "game", "play", "team", "player", "coach", "referee", "score", "point",
  "goal", "win", "lose", "tie", "match", "tournament", "championship", "league",
  "football", "soccer", "basketball", "baseball", "tennis", "golf", "hockey", "volleyball",
  "swimming", "running", "jumping", "throwing", "catching", "kicking", "hitting", "scoring",
  "race", "marathon", "sprint", "relay", "gymnastics", "wrestling", "boxing", "karate",
  "skiing", "snowboarding", "skating", "surfing", "sailing", "fishing", "hunting", "camping",
  "hiking", "climbing", "biking", "skateboarding", "rollerblading", "dancing", "yoga",
  "exercise", "workout", "training", "practice", "competition", "challenge", "record",
  "medal", "trophy", "award", "champion", "winner", "loser", "amateur", "professional"
];

// Education and learning
const educationWords = [
  "education", "school", "university", "college", "class", "course", "lesson", "lecture",
  "teacher", "professor", "student", "pupil", "classmate", "principal", "dean", "director",
  "study", "learn", "teach", "instruct", "explain", "demonstrate", "practice", "review",
  "test", "exam", "quiz", "assignment", "homework", "project", "research", "experiment",
  "book", "textbook", "novel", "story", "poem", "article", "essay", "report", "paper",
  "library", "laboratory", "classroom", "auditorium", "gymnasium", "cafeteria", "office",
  "subject", "topic", "theme", "concept", "theory", "principle", "method", "technique",
  "knowledge", "wisdom", "intelligence", "skill", "ability", "talent", "gift", "genius",
  "degree", "diploma", "certificate", "license", "qualification", "expertise", "experience"
];

// Business and economy
const businessWords = [
  "business", "company", "corporation", "organization", "enterprise", "firm", "agency",
  "office", "factory", "warehouse", "store", "shop", "market", "mall", "supermarket",
  "bank", "account", "money", "cash", "credit", "debit", "loan", "investment", "profit",
  "loss", "revenue", "expense", "budget", "cost", "price", "value", "worth", "wealth",
  "income", "salary", "wage", "payment", "bill", "invoice", "receipt", "tax", "fee",
  "employee", "employer", "worker", "manager", "director", "executive", "president",
  "customer", "client", "consumer", "buyer", "seller", "vendor", "supplier", "partner",
  "contract", "agreement", "deal", "transaction", "trade", "commerce", "industry", "sector"
];

// Health and medicine
const healthWords = [
  "health", "medicine", "doctor", "nurse", "patient", "hospital", "clinic", "pharmacy",
  "disease", "illness", "sickness", "infection", "virus", "bacteria", "germ", "vaccine",
  "medicine", "drug", "pill", "tablet", "capsule", "syrup", "ointment", "cream",
  "surgery", "operation", "treatment", "therapy", "recovery", "healing", "cure",
  "pain", "ache", "fever", "cough", "sneeze", "headache", "stomachache", "injury",
  "wound", "cut", "bruise", "burn", "fracture", "sprain", "strain", "dislocation",
  "heart", "lung", "brain", "liver", "kidney", "stomach", "intestine", "muscle", "bone",
  "blood", "oxygen", "vitamin", "mineral", "protein", "carbohydrate", "fat", "fiber"
];

// Arts and entertainment
const artsWords = [
  "art", "music", "dance", "theater", "film", "movie", "television", "radio", "book",
  "painting", "drawing", "sculpture", "photography", "cinema", "drama", "comedy", "tragedy",
  "actor", "actress", "director", "producer", "writer", "author", "poet", "artist",
  "musician", "singer", "dancer", "performer", "audience", "spectator", "viewer", "listener",
  "song", "melody", "rhythm", "beat", "harmony", "chord", "note", "instrument", "guitar",
  "piano", "violin", "drum", "flute", "trumpet", "saxophone", "bass", "keyboard", "synthesizer",
  "concert", "performance", "show", "exhibition", "gallery", "museum", "studio", "stage",
  "script", "screenplay", "novel", "poem", "story", "tale", "fable", "legend", "myth"
];

// Time and calendar
const timeWords = [
  "time", "day", "night", "morning", "afternoon", "evening", "midnight", "noon", "dawn",
  "dusk", "sunrise", "sunset", "hour", "minute", "second", "week", "month", "year",
  "decade", "century", "millennium", "era", "period", "age", "generation", "lifetime",
  "moment", "instant", "while", "duration", "interval", "pause", "break", "rest",
  "schedule", "calendar", "date", "birthday", "anniversary", "holiday", "vacation",
  "season", "spring", "summer", "autumn", "winter", "january", "february", "march",
  "april", "may", "june", "july", "august", "september", "october", "november", "december",
  "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"
];

// Emotions and feelings
const emotionWords = [
  "emotion", "feeling", "mood", "attitude", "personality", "character", "temperament",
  "happy", "sad", "angry", "excited", "bored", "tired", "energetic", "calm", "nervous",
  "anxious", "worried", "scared", "afraid", "frightened", "terrified", "confident", "proud",
  "ashamed", "embarrassed", "guilty", "innocent", "jealous", "envious", "grateful", "thankful",
  "love", "hate", "like", "dislike", "enjoy", "prefer", "want", "need", "desire", "wish",
  "hope", "dream", "imagine", "remember", "forget", "miss", "regret", "forgive", "blame",
  "trust", "doubt", "believe", "know", "understand", "confuse", "surprise", "shock", "amaze"
];

// Combine all categories into one array
export const seedWords = [
  ...commonNouns,
  ...commonVerbs,
  ...commonAdjectives,
  ...technologyWords,
  ...natureWords,
  ...foodWords,
  ...transportationWords,
  ...sportsWords,
  ...educationWords,
  ...businessWords,
  ...healthWords,
  ...artsWords,
  ...timeWords,
  ...emotionWords
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

/**
 * Gets words by category
 * @param {string} category - The category to get words from
 * @returns {Array<string>} Array of words in the specified category
 */
export const getWordsByCategory = (category) => {
  const categoryMap = {
    'commonNouns': commonNouns,
    'commonVerbs': commonVerbs,
    'commonAdjectives': commonAdjectives,
    'technology': technologyWords,
    'nature': natureWords,
    'food': foodWords,
    'transportation': transportationWords,
    'sports': sportsWords,
    'education': educationWords,
    'business': businessWords,
    'health': healthWords,
    'arts': artsWords,
    'time': timeWords,
    'emotions': emotionWords
  };
  
  return categoryMap[category] || [];
};

/**
 * Gets all available categories
 * @returns {Array<string>} Array of category names
 */
export const getCategories = () => {
  return [
    'commonNouns', 'commonVerbs', 'commonAdjectives', 'technology', 'nature', 
    'food', 'transportation', 'sports', 'education', 'business', 'health', 
    'arts', 'time', 'emotions'
  ];
}; 
