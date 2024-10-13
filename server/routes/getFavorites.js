import openConnection from '../db/connection.js';

const getFavorites = async(req, res) => {
  let connection;
  try {
    connection = await openConnection();
    await connection.query('USE quote');
    const [favoriteQuotes] = await connection.query(`SELECT * FROM quote WHERE isFavorite = 1`);

    return res.status(200).json({ favoriteQuotes });
  } catch(error) {
    console.error(error);
    return res.status(500).json({ message: `Failed retrieving favorites` });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export default getFavorites;