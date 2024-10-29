import openConnection from '../../db/connection.js';

const addToFavorites = async(req, res) => {
  const { randomQuote } = req.body;
  const user = req.user;

  let connection;
  try {
    connection = await openConnection();
    await connection.query('USE quotes');

    const query = `SELECT * FROM user_quotes WHERE quote_id = ? AND user_id = ?`;
    await connection.query(query, [randomQuote.id, user.id]);

    return res.status(201).json({ message: 'Quote added to your favorites' });
  } catch(error) {
    console.log('Server error. Failed adding quote to favorites', error);
    return res.status(201).json({ message: 'Server error. Failed adding quote to favorites' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

export default addToFavorites;