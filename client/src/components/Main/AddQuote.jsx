import { useState, useEffect } from "react";

import makeTitle from "../../utils/makeTitle.js";

const AddQuote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [origin, setOrigin] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Making title for the component
    makeTitle("Добавить цитату");
  }, [])

  const handleSubmit = async(e) => {
    e.preventDefault();

    const freshQuote = {
      quote,
      author,
      category,
      origin
    }

    try {
      const response = await fetch('http://localhost:3000/api/post-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(freshQuote)
      })

      const result = await response.json();
  
      if (response.ok) {
        setQuote("");
        setAuthor("");
        setCategory("");
        setOrigin("");
      }
  
      setMessage(result.message);
    } catch(error) {
      setMessage(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Цитата:</label>
        <input
          type="text"
          value={ quote }
          onChange={ (e) => setQuote(e.target.value) }
          required
        />
      </div>

      <div>
        <label>Автор:</label>
        <input
          type="text"
          value={ author }
          onChange={ (e) => setAuthor(e.target.value) }
          required
        />
      </div>

      <div>
        <label>Категория:</label>
        <input
          type="text"
          value={ category }
          onChange={ (e) => setCategory(e.target.value) }
          required
        />
      </div>

      <div>
        <label>Источник:</label>
        <input
          type="text"
          value={ origin }
          onChange={ (e) => setOrigin(e.target.value) }
          required
        />
      </div>

      <button type="submit">Добавить цитату</button>

      { message && <p>{message}</p> }
    </form>
  );
}

export default AddQuote;