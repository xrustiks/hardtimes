import { useState, useEffect, useContext } from 'react';
import { CategoriesContext } from '../../../hooks/CategoriesContext.jsx';

import makeTitle from "../../../utils/makeTitle.js";
import { addToFavorites } from "../../../utils/favorites.js";
import particlesjsConfig from "../../../assets/particlesjs-config.json";
import './Home.css';

const Home = () => {
  const [chosenCategory] = useContext(CategoriesContext);
  const [randomQuote, setRandomQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  const fetchRandomQuote = async () => {
    try {
      // Fetching a random quote from the server depending on the chosen category
      const url = chosenCategory
        ? `http://localhost:3000/api/random-quote?category=${chosenCategory}`
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
      console.error('Error fetching random quote:', error);
    }
  }

  useEffect(() => {
    // Fetching a random quote when the component is mounted
    fetchRandomQuote();

    // Updates the quote when the user presses the keyboard button
    const handleKeyPress = (event) => {
      if (event.key === "r" || event.key === "к") {
        fetchRandomQuote();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [chosenCategory]);

  return (
    <>
      { /* ParticlesJS background */ }
      <div id="particles-js"></div>
        { /* Component content */ }
        <div className="random-quote">
          <h1>Hard times</h1>

          { randomQuote ? (
            <blockquote>
              <div>&quot;{ randomQuote.quote }&quot;</div>
              <div>Категория: { randomQuote.category }</div>
              <div>Источник: { randomQuote.origin }</div>
              <footer>Автор: { randomQuote.author }</footer>

              <button type="submit"
                onClick={ () => addToFavorites(token, randomQuote, setIsLoading, setMessage) }
                disabled={ isLoading }
              >
                { isLoading ? 'Adding...' : 'Add to favorites' }
              </button>
              { message && <p>{ message }</p> }
            </blockquote>
          ) : (
            <blockquote>
              <p>Загрузка...</p>
            </blockquote>
          ) }

          <button type="button" onClick={ () => fetchRandomQuote() }>
            Next quote
          </button>
        </div>
    </>
  );
}

export default Home;
