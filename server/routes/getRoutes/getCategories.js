import openConnection from '../../db/connection.js';
import { logError } from '../../../utils/logging.js';

const getCategories = async (req, res) => {
  let connection;
  try {
    connection = await openConnection();
    await connection.query('USE quotes');

    const [categories] = await connection.execute(
      `SELECT DISTINCT category FROM quotes`
    )
    if (categories.length === 0) {
      return res.status(404).json({ message: 'No categories found' });
    }

    return res.status(200).json({ categories: categories });
  } catch(error) {
    logError(error);
    return res.status(500).json({ message: 'Failed retrieving categories' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export default getCategories;