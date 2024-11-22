import { useState, useEffect, useContext } from 'react';

import { CategoriesContext } from '../../../hooks/CategoriesContext.jsx';
import { addToFavorites } from "../../../utils/favoritesUtils.js";
import './RandomQuote.css';

const RandomQuote = () => {
  const [chosenCategory] = useContext(CategoriesContext);
  const [randomQuote, setRandomQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem('token');

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
    <div className="random-quote">
      { randomQuote ? (
        <blockquote>
          <div className="quote">&quot;{ randomQuote.quote }&quot;</div>
          <div className="quote-category">Категория: { randomQuote.category }</div>
          <div className="quote-origin">Источник: { randomQuote.origin }</div>
          <footer className="quote-author">Автор: { randomQuote.author }</footer>

          <button
            className="add-to-favorites-button"
            type="submit"
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

      <button
        className="generate-quote-button"
        type="button"
        onClick={ () => fetchRandomQuote() }>
        Next quote
      </button>
    </div>
  );
}

export default RandomQuote;