import { useState, useEffect, useContext } from 'react';
import { FavoritesContext } from '../../../hooks/FavoritesContext.jsx';

import { removeFromFavorites } from "../../../utils/favorites.js";
import makeTitle from "../../../utils/makeTitle.js";

const Favorites = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  // Context variables
  const [favorites, setFavorites] = useContext(FavoritesContext);

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Making title for the component
    makeTitle("Избранное");

    // Fetch favorite quotes from database
    const fetchFavorites = async() => {
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost:3000/api/favorites', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const result = await response.json();

        if (!response.ok || result.favorites.length === 0) {
          return setMessage(result.message);
        }

        setFavorites(result.favorites);
      } catch(error) {
        console.log('Error fetching favorite quotes', error);
        setMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFavorites();
  }, [setFavorites, token])

  return (
    <div className="favorites-page">
      <h1>Избранные цитаты</h1>

      { isLoading ? (
        <p>Загрузка...</p>
      ) : (
        favorites.length > 0 ? (
          // If there are favorite quotes, display them
          favorites.map((quote) => (
            <blockquote key={quote.id}>
              <div>&quot;{quote.quote}&quot;</div>
              <div>Категория: {quote.category}</div>
              <div>Источник: {quote.origin}</div>
              <footer>Автор: {quote.author}</footer>

              <button type="button" 
                onClick={ () => removeFromFavorites(
                  token, quote, favorites, setFavorites, setIsLoading, setMessage
                ) }
              >
                Удалить из избранного
              </button>
            </blockquote>
          ))
        ) : (
          // If there are no favorite quotes, display a message
          <p>{ message }</p>
        )
      ) }
    </div>
  )
}

export default Favorites;