import { useState, useEffect, useContext } from 'react';

import { CategoriesContext } from '../../../hooks/CategoriesContext.jsx';
import { addToFavorites } from "../../../utils/favorites.js";
import makeTitle from "../../../utils/makeTitle.js";

const Home = () => {
  const [chosenCategory] = useContext(CategoriesContext);
  const [randomQuote, setRandomQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Making title for the component
    makeTitle("Главная");
  }, []);

  const fetchRandomQuote = async() => {
    try {
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
    } catch(error) {
      console.error('Error fetching random quote:', error);
    }
  }

  useEffect(() => {
    fetchRandomQuote();

    // Updates the quote when the user presses the keyboard button
    const handleKeyPress = (event) => {
      // for Latin and Cyrillic keyboard layout
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
      <h1>Hard times</h1>
      <div className="random-quote">
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
  )
}

export default Home;