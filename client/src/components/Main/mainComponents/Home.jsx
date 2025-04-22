import { useEffect, useState, useContext } from 'react';

import makeTitle from "../../../utils/makeTitle.js";
import { addToFavorites } from "../../../utils/favoritesUtils.js";
import { logError } from "../../../../../utils/logging.js"; 

import particlesjsConfig from "../../../assets/particlesjs-config.json";
import RandomQuote from "./RandomQuote.jsx";
import { CategoriesContext } from '../../../hooks/CategoriesContext.jsx';

const Home = () => {
  const [randomQuote, setRandomQuote] = useState(null);
  const [chosenCategory] = useContext(CategoriesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem('token');

  const fetchRandomQuote = async () => {
    try {
      // Fetching a random quote from the server depending on the chosen category
      const url = chosenCategory
        ? `http://localhost:3000/api/random-quote?category=${ chosenCategory }`
        : 'http://localhost:3000/api/random-quote';

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      setRandomQuote(result);
    } catch (error) {
      logError('Error fetching random quote:', error);
    }
  }

  useEffect(() => {
    // Making title for the component
    makeTitle("Главная");

    // Due to particleJS connected as a script in index.html,
    // we need to check if it's available
    if (window.particlesJS) {
      // Initializing particlesJS with the config file
      window.particlesJS("particles-js", particlesjsConfig);
    }
  }, []);

  return (
    <div className="home-page">
      { /* ParticlesJS background */ }
      <div id="particles-js"></div>

      { /* Control buttons */ }
      <div className="home-page-buttons">
        <button
          className="add-to-favorites-button"
          type="button"
          onClick={ () => addToFavorites(token, randomQuote, setIsLoading, setMessage) }
          disabled={ isLoading }
        >
          { isLoading ? 'Добавляется...' : 'В избранное' }
        </button>

        <button
          className="generate-quote-button"
          type="button"
          onClick={ () => fetchRandomQuote() }>
          Обновить
        </button>
      </div>

      { /* RandomQuote component */ }
      <div className="home-page-random-quote">
        <RandomQuote
          fetchRandomQuote={ fetchRandomQuote }
          randomQuote={ randomQuote }
          chosenCategory={ chosenCategory }
          message={ message }
        />
      </div>
    </div>
  );
}

export default Home;
