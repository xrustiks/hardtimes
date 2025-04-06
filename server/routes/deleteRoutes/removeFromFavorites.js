import openConnection from '../../db/connection.js';

import { logInfo } from '../../helpers/logging.js';
import { logError } from '../../helpers/logging.js';

const removeFromFavorites = async(req, res) => {
  let connection;

  try {
    // Receive quote data from frontend
    const { randomQuote } = req.body;
    // Extract user data from headers
    const user = req.user;

    connection = await openConnection();
    await connection.query('USE quotes');

    const [result] = await connection.query(
      `DELETE FROM favorite_quotes WHERE quote_id = ? AND user_id = ?`, 
      [randomQuote.id, user.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Quote not found in favorites' });
    }

    return res.status(200).json({ message: 'Quote successfully deleted from favorites' });
  } catch(error) {
    logError('Unable to delete from favorites:', error);
    return res.status(500).json({ message: 'Server error: failed deleting from favorites' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

export default removeFromFavorites;