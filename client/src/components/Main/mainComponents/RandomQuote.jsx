import { useEffect, useState } from 'react';

const RandomQuote = ({ fetchRandomQuote, randomQuote, chosenCategory, message }) => {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // Fetching a random quote when the component is mounted
    fetchRandomQuote();

    // Updates the quote when the user presses the keyboard button
    const handleKeyPress = (event) => {
      if (event.key === "r" || event.key === "к") {
        fetchRandomQuote();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [chosenCategory]);

  useEffect(() => {
    // Changing key to reload the animation
    setAnimationKey((prevKey) => prevKey + 1);
  }, [randomQuote]);

  return (
    <div className="random-quote">
      { randomQuote ? (
        <blockquote>
          { /* When an element is given a new key,
          React thinks a new element has been created, even if the content has not changed */ }
          <div className="quote" key={ animationKey }>&quot;{ randomQuote.quote }&quot;</div>

          <div className="quote-details">
            <div className="quote-category">Категория: { randomQuote.category }</div>
            <div className="quote-origin">Источник: { randomQuote.origin }</div>
            <footer className="quote-author">Автор: { randomQuote.author }</footer>
          </div>

          { message && <p>{ message }</p> }
        </blockquote>
      ) : (
        <blockquote>
          <p>Загрузка...</p>
        </blockquote>
      ) }
    </div>
  );
}

export default RandomQuote;