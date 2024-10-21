import { useState, useEffect } from "react";

import makeTitle from "../../../utils/makeTitle.js";

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
    // Prevents reloading page after submitting
    e.preventDefault();

    // What should be sent in request to server
    const freshQuote = {
      quote,
      author,
      category,
      origin
    }

    try {
      // Sending a POST request to the server and waiting for the response
      const response = await fetch('http://localhost:3000/api/add-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(freshQuote)
      })

      if (response.ok) {
        setQuote("");
        setAuthor("");
        setCategory("");
        setOrigin("");
      }

      const result = await response.json();
      console.log(response);
      console.log(result);

      setMessage(result.message);
    } catch(error) {
      setMessage(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="quote">
        <label>Цитата:</label>
        <input
          type="text"
          value={ quote }
          onChange={ (e) => setQuote(e.target.value) }
          required
        />
      </div>

      <div className="author">
        <label>Автор:</label>
        <input
          type="text"
          value={ author }
          onChange={ (e) => setAuthor(e.target.value) }
          required
        />
      </div>

      <div className="category">
        <label>Категория:</label>
        <input
          type="text"
          value={ category }
          onChange={ (e) => setCategory(e.target.value) }
          required
        />
      </div>

      <div className="origin">
        <label>Источник:</label>
        <input
          type="text"
          value={ origin }
          onChange={ (e) => setOrigin(e.target.value) }
          required
        />
      </div>

      <button type="submit">Добавить цитату</button>

      { message && <p className="message">{ message }</p> }
    </form>
  );
}

export default AddQuote;