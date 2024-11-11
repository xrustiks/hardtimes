import openConnection from '../../db/connection.js';

const getFavorites = async(req, res) => {
  let connection;
  try {
    connection = await openConnection();
    await connection.query('USE quotes');

    // Getting all favorite quotes for the user
    const [favoriteQuotes] = await connection.execute(
      `SELECT *
      FROM quotes
      JOIN favorite_quotes ON quotes.id = favorite_quotes.quote_id
      WHERE user_id = ?`,
      [req.user.id]
    );
    if (favoriteQuotes.length === 0) {
      return res.status(200).json({ message: 'No favorite quotes found', favorites: [] });
    }

    return res.status(200).json({ favorites: favoriteQuotes });
  } catch(error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed retrieving favorites' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export default getFavorites;