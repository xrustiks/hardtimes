import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../hooks/UserContext.jsx';

import makeTitle from "../../../utils/makeTitle.js";

const Favorites = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [favorites, setFavorites] = useContext(UserContext);

  useEffect(() => {
    // Making title for the component
    makeTitle("Избранное");

    // Fetch favorite quotes from database
    const fetchFavorites = async() => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      try {
        const response = await fetch('http://localhost:3000/api/favorites', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const result = await response.json();
        setFavorites(result.favorites);
      } catch(error) {
        console.log('Error fetching favorite quotes', error);
        setMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFavorites();
  }, [setFavorites])

  return (
    <div className="favorites-page">
      <h1>Избранные цитаты</h1>

      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        favorites.map((quote) => (
          <blockquote key={quote.id}>
            <div>&quot;{quote.quote}&quot;</div>
            <div>Категория: {quote.category}</div>
            <div>Источник: {quote.origin}</div>
            <footer>Автор: {quote.author}</footer>
          </blockquote>
        ))
      )}
      {message && <p>{message}</p>}
    </div>
  )
}

export default Favorites;