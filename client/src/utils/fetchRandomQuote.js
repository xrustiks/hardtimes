import { logError } from "../../../utils/logging.js";

// Fetches a random quote from the server based on the chosen category
const fetchRandomQuote = async (chosenCategory, setRandomQuote) => {
    try {
      // Fetching a random quote from the server depending on the chosen category
      const url = chosenCategory
        ? `http://localhost:3000/api/random-quote?category=${ chosenCategory }`
        : 'http://localhost:3000/api/random-quote';

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const result = await response.json();
      setRandomQuote(result);
    } catch (error) {
      logError('Error fetching random quote:', error);
    }
  }

  export default fetchRandomQuote;