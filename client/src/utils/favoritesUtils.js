// Adds a quote to favorites
export const addToFavorites = async(token, randomQuote, favorites, setFavorites, setIsLoading, setMessage) => {
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
      setFavorites([...favorites, randomQuote]);
    }
  } catch(error) {
    console.error('Error adding to favorites:', error);
    setMessage(error.message);
  } finally {
    setIsLoading(false);
  }
}

// Removes a quote from favorites
export const removeFromFavorites = async(token, randomQuote, favorites, setFavorites, setIsLoading, setMessage) => {
  setIsLoading(true);

  try {
    const response = await fetch('http://localhost:3000/api/removeFromFavorites', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ token }`
      },
      body: JSON.stringify({ randomQuote: randomQuote })
    });

    const result = await response.json();

    if (response.ok) {
      setFavorites(favorites.filter((quote) => quote.id !== randomQuote.id));
    } else {
      setMessage(result.message);
    }
  } catch(error) {
    console.log('Error deleting quote:', error);
    setMessage(error.message);
  } finally {
    setIsLoading(false);
  }
}
