import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../hooks/UserContext.jsx';

import makeTitle from "../../../utils/makeTitle.js";

const Home = () => {
  const [randomQuote, setRandomQuote] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Context variables
  const [favorites, setFavorites] = useContext(UserContext);

  const token = localStorage.getItem('token');
  
  useEffect(() => {
    // Making title for the component
    makeTitle("Главная");
  }, [])

  useEffect(() => {
    const fetchRandomQuote = async() => {
      try {
        const response = await fetch('http://localhost:3000/api/random-quote');
        const data = await response.json();
        setRandomQuote(data);
      } catch(error) {
        console.error('Error fetching random quote:', error);
      }
    }

    fetchRandomQuote();
  }, [])

  const addToFavorites = async() => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/addToFavorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ randomQuote: randomQuote })
      })

      const result = await response.json();

      if (response.ok) {
        // Add quote to the context
        setFavorites((prevFavorites) => [...prevFavorites, randomQuote]);
        // Display status
        setMessage(result.message);
      } else {
        setMessage(result.message);
      }
    } catch(error) {
      console.error('Error adding to favorites:', error);
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1>Hard times</h1>
      <div className="random-quote">
        {randomQuote ? (
          <blockquote>
            <p>&quot;{ randomQuote.quote }&quot;</p>
            <p>Категория: { randomQuote.category }</p>
            <p>Источник: { randomQuote.origin }</p>

            <footer>Автор: { randomQuote.author }</footer>

            <button type="submit" onClick={ addToFavorites } disabled={isLoading}>
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