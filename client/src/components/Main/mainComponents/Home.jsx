import { useState, useEffect } from 'react';

import { addToFavorites } from "../../../utils/favorites.js";
import makeTitle from "../../../utils/makeTitle.js";

const Home = () => {
  const [randomQuote, setRandomQuote] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Context variables
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    // Making title for the component
    makeTitle("Главная");
  }, [])

  useEffect(() => {
    const fetchRandomQuote = async() => {
      try {
        const response = await fetch('http://localhost:3000/api/random-quote', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setRandomQuote(data);
      } catch(error) {
        console.error('Error fetching random quote:', error);
      }
    }

    fetchRandomQuote();
  }, [])

  return (
    <>
      <h1>Hard times</h1>
      <div className="random-quote">
        {randomQuote ? (
          <blockquote>
            <div>&quot;{ randomQuote.quote }&quot;</div>
            <div>Категория: { randomQuote.category }</div>
            <div>Источник: { randomQuote.origin }</div>
            <footer>Автор: { randomQuote.author }</footer>

            <button type="submit" 
              onClick={ () => addToFavorites(token, randomQuote, setIsLoading, setMessage) } 
              disabled={ isLoading }
            >
              {isLoading ? 'Adding...' : 'Add to favorites'}
            </button>
            {message && <p>{message}</p>}
          </blockquote>
        ) : (
          <blockquote>
            <p>Загрузка...</p>
          </blockquote>
        )}
      </div>
    </>
  )
}

export default Home;