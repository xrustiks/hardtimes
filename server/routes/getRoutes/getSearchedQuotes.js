import openConnection from '../../db/connection.js';
import { logError } from '../../../utils/logging.js';

const getSearchedQuotes = async(req, res) => {
  const { query } = req.params;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  let connection;
  try {
    connection = await openConnection();
    await connection.query('USE quotes');

    const [searchResult] = await connection.execute(
      `SELECT * FROM quotes WHERE 
      quote LIKE ? OR 
      author LIKE ? OR 
      category LIKE ? OR 
      origin LIKE ?`,
      [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`]
    );

    if (searchResult.length === 0) {
      return res.status(200).json({ message: 'No quotes found' });
    }

    return res.status(200).json({ searchResult: searchResult });
  } catch(error) {
    logError('Internal server error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export default getSearchedQuotes;