import openConnection from '../../db/connection.js';

const addToFavorites = async(req, res) => {
  const { randomQuote } = req.body;
  const user = req.user;

  let connection;
  try {
    connection = await openConnection();
    await connection.query('USE quotes');

    // Checking if the quote is already in the user's favorites
    const [existingQuote] = await connection.query(
      `SELECT * FROM favorite_quotes WHERE quote_id = ? AND user_id = ?`, 
      [randomQuote.id, user.id]
    );
    if (existingQuote.length > 0) {
      return res.status(201).json({ message: 'This quote is already in your favorites' });
    }

    // If not, then add it to the user's favorites
    await connection.query(
      `INSERT INTO favorite_quotes (quote_id, user_id) VALUES (?, ?)`, 
      [randomQuote.id, user.id]
    );

    return res.status(201).json({ message: 'Quote added to your favorites' });
  } catch(error) {
    console.log('Server error. Failed adding quote to favorites', error);
    return res.status(500).json({ message: 'Server error. Failed adding quote to favorites' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

export default addToFavorites;