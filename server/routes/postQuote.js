import openConnection from '../db/connection.js';

const addQuote = async(req, res) => {
  const { quote, author, category, origin } = req.body;

  if (!quote || !author || !category || !origin) {
    return res.status(400).json({ message: "All fields are necessary" })
  }

  let connection;
  try {
    connection = await openConnection();
    await connection.query('use quotes');

    const query = `INSERT INTO quotes (quote, author, category, origin) VALUES (?, ?, ?, ?)`;
    await connection.query(query, [quote, author, category, origin]);
    return res.status(201).json({ message: 'Quote successfully added' });
  } catch(error) {
    console.error('Failed adding the quote, ' + error);
    return res.status(500).json({ message: 'Server error' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export default addQuote;