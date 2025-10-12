import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import makeTitle from "../../../utils/makeTitle.js";
import getApiUrl from '../../../utils/apiConfig.js';
import ToggleFavoriteButton from "./ToggleFavoriteButton.jsx";
import { FavoritesContext } from '../../../hooks/FavoritesContext.jsx';
import { logInfo } from "../../../../../utils/logging.js";
import { logError } from "../../../../../utils/logging.js";

const SearchPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [favorites, setFavorites] = useContext(FavoritesContext);
  // Getting query from URL params
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  logInfo(query);

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Making title for the component
    makeTitle("Поиск");

    const fetchQuotes = async() => {
      setIsLoading(true);

      try {
        const response = await fetch(getApiUrl(`/api/search-quotes/${query}`), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();
        if (result.searchResult && result.searchResult.length > 0) {
          setQuotes(result.searchResult);
        } else {
          setMessage(result.message);
        }
      } catch(error) {
        logError('Error fetching search results:', error);
        setMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchQuotes();
    } else {
      setMessage('Введите поисковый запрос');
    }
  }, [query])

  return (
    <div className="search-page">
      <h1>Найденные цитаты:</h1>

      <div className="search-page-content">
        { isLoading ? (
          <p>Загрузка...</p>
        ) : (
          quotes.length > 0 ? (
            quotes.map((quote) => (
              <>
                <blockquote key={ quote.id }>
                  <div>&quot;{ quote.quote }&quot;</div>
                  <div>Категория: { quote.category }</div>
                  <div>Источник: { quote.origin }</div>
                  <footer>Автор: { quote.author }</footer>

                  <ToggleFavoriteButton
                    token={ token }
                    randomQuote={ quote }
                    favorites={ favorites }
                    setFavorites={ setFavorites }
                    setIsLoading={ setIsLoading }
                    setMessage={ setMessage }
                    isFavorite={ favorites.some(fav => fav.id === quote.id) }
                    isLoading={ isLoading }
                  />
                </blockquote>
              </>
            ))
          ) : (
            <div className="result-message">
              { message && <p>{ message }</p> }
            </div>
          )
        ) }
      </div>
    </div>
  );
}

export default SearchPage;