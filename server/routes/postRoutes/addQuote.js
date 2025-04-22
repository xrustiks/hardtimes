import openConnection from '../../db/connection.js';

import { logError } from '../../../utils/logging.js';

const addQuote = async(req, res) => {
  const { quote, author, category, origin } = req.body;

  if (!quote || !author || !category || !origin) {
    return res.status(400).json({ message: "All fields are necessary" })
  }

  let connection;
  try {
    connection = await openConnection();
    await connection.query('USE quotes');

    // Adding the quote to the database
    await connection.execute(
      `INSERT INTO quotes (quote, author, category, origin) VALUES (?, ?, ?, ?)`, 
      [quote, author, category, origin]
    );

    return res.status(201).json({ message: 'Quote successfully added' });
  } catch(error) {
    logError('Server error. Failed adding the quote, ' + error);
    return res.status(500).json({ message: 'Server error. Failed adding the quote' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export default addQuote;