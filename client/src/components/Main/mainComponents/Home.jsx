import { useEffect, useState, useContext } from 'react';

import makeTitle from "../../../utils/makeTitle.js";
import fetchRandomQuote from "../../../utils/fetchRandomQuote.js";
import ToggleFavoriteButton from "./ToggleFavoriteButton.jsx";
// import { logError } from "../../../../../utils/logging.js"; 

import particlesjsConfig from "../../../assets/particlesjs-config.json";
import RandomQuote from "./RandomQuote.jsx";
import { CategoriesContext } from '../../../hooks/CategoriesContext.jsx';
import { FavoritesContext } from '../../../hooks/FavoritesContext.jsx';

const Home = () => {
  const [randomQuote, setRandomQuote] = useState(null);
  const [chosenCategory] = useContext(CategoriesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [favorites, setFavorites] = useContext(FavoritesContext);

  const token = localStorage.getItem('token');

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

  // Check if a quote is already in favorites
  const isFavorite = randomQuote && favorites.some((quote) => {
    return quote.id === randomQuote.id;
  });

  return (
    <div className="home-page">
      { /* ParticlesJS background */ }
      <div id="particles-js"></div>

      { /* Control buttons */ }
      <div className="home-page-buttons">
        <ToggleFavoriteButton
          token={ token }
          randomQuote={ randomQuote }
          favorites={ favorites }
          setFavorites={ setFavorites }
          setIsLoading={ setIsLoading }
          setMessage={ setMessage }
          isFavorite={ isFavorite }
          isLoading={ isLoading }
        />

        <button
          className="generate-quote-button"
          type="button"
          onClick={ () => fetchRandomQuote(chosenCategory, setRandomQuote) }>
          Следующая
        </button>
      </div>

      { /* RandomQuote component */ }
      <div className="home-page-random-quote">
        <RandomQuote
          fetchRandomQuote={ () => fetchRandomQuote(chosenCategory, setRandomQuote) }
          randomQuote={ randomQuote }
          chosenCategory={ chosenCategory }
          message={ message }
        />
      </div>
    </div>
  );
}

export default Home;
