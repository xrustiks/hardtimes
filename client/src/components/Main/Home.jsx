import { useState, useEffect } from 'react';

const Home = () => {
  const [randomQuote, setRandomQuote] = useState(null);

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

  return (
    <>
      <h1>Hard times</h1>
      <div className="random-quote">
        {randomQuote ? (
          <blockquote>
            <p>&quot;{randomQuote.quote}&quot;</p>
            <p>Категория: {randomQuote.category}</p>
            <p>Источник: {randomQuote.origin}</p>
            <footer>Автор: {randomQuote.author}</footer>
          </blockquote>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  )
}

export default Home;