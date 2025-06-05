import { addToFavorites, removeFromFavorites } from "../../../utils/favoritesUtils.js";

const ToggleFavoriteButton = ({ token, randomQuote, favorites, setFavorites, setIsLoading, setMessage, isFavorite, isLoading }) => {
  return (
    <button
      className="add-to-favorites-button"
      type="button"
      onClick={ isFavorite
        ? () => removeFromFavorites(token, randomQuote, favorites, setFavorites, setIsLoading, setMessage)
        : () => addToFavorites(token, randomQuote, favorites, setFavorites, setIsLoading, setMessage)
      }
      disabled={ isLoading }
    >
      { isLoading
        // Switching button text based on loading state and favorite status
        ? (isFavorite ? 'Удаляется...' : 'Добавляется...')
        : (isFavorite ? 'Из избранного' : 'В избранное')
      }
    </button>
  );
}

export default ToggleFavoriteButton;