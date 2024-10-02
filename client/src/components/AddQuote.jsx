const AddForm = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [origin, setOrigin] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async() => {
    const freshQuote = {
      quote,
      author,
      category,
      origin
    }

    try {
      const response = await fetch('/add-quote', {
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
      setMessage('Error sending data: ' + error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Цитата:</label>
        <input
          type="text"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Автор:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <div>
        <label>Категория:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div>
        <label>Источник:</label>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
      </div>

      <button type="submit">Добавить цитату</button>

      { if message && <p>{message}</p> }
    </form>
  );
}

export default AddForm;