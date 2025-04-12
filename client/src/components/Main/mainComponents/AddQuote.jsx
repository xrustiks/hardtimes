import { useState, useEffect } from "react";

import makeTitle from "../../../utils/makeTitle.js";

const AddQuote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [origin, setOrigin] = useState("");
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const [isAdminMessage, setIsAdminMessage] = useState("");

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Making title for the component
    makeTitle("Добавить цитату");

    // Checking if a user is admin
    const checkAdmin = async() => {
      try {
        const response = await fetch('http://localhost:3000/api/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const result = await response.json();
        if (!response.ok || !result.user.isAdmin) {
          setIsAdmin(false);
          setIsAdminMessage("You are not authorized to add quotes");
        }
      } catch(error) {
        setMessage(error.message);
      }
    }

    checkAdmin();
  }, [token])

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
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(freshQuote)
      })

      const result = await response.json();

      if (response.ok) {
        setQuote("");
        setAuthor("");
        setCategory("");
        setOrigin("");
        
        setMessage(result.message);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage(`Network error: ${error.message}. Please try again later.`);
    }
  }

  if (!isAdmin) {
    return <p className="message">{ isAdminMessage }</p>
  }

  return (
    <div className="add-quote-page">
      <form onSubmit={ handleSubmit }>
        <div className="quote">
          <label>Цитата:</label>
          <input
            type="text"
            value={ quote }
            onChange={ (e) => setQuote(e.target.value) }
            maxLength="500"
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
    </div>
  );
}

export default AddQuote;