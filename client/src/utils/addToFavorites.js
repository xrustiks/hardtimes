const addToFavorites = async(token, randomQuote, setIsLoading, setMessage) => {
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

export default addToFavorites;