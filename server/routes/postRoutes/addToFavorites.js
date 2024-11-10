import openConnection from '../../db/connection.js';

const addToFavorites = async(req, res) => {
  let connection;
  
  try {
    // Receive quote data from frontend
    const { randomQuote } = req.body;
    // Extract user data from headers
    const user = req.user;

    connection = await openConnection();
    await connection.query('USE quotes');

    // Checking if the quote is already in the user's favorites
    const [existingQuote] = await connection.execute(
      `SELECT * FROM favorite_quotes WHERE quote_id = ? AND user_id = ?`, 
      [randomQuote.id, user.id]
    );
    if (existingQuote.length > 0) {
      return res.status(201).json({ message: 'This quote is already in your favorites' });
    }

    // If not, then add it to the favorite_quotes table
    await connection.execute(
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