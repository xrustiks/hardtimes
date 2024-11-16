import openConnection from '../db/connection.js';

// Generates a random quote from the database (for the main page)
const generateRandomQuote = async (category) => {
  let connection;
  try {
    connection = await openConnection();
    await connection.query('USE quotes');

    // If a category is not specified, get a random quote from the database
    let query = 'SELECT * FROM quotes ORDER BY RAND() LIMIT 1';
    let params = [];

    // If a category is specified, get a random quote from the specified category
    if (category) {
      query = `SELECT * FROM quotes WHERE category = ? ORDER BY RAND() LIMIT 1`;
      params = [category];
    }

    // connection.query returns an array of two arrays: the result of a query and the metadata
    // const [randomQuote] is destructuring the first array
    const [randomQuote] = await connection.query(query, params);

    return randomQuote[0];
  } catch(error) {
    console.error('Error getting random quote:', error);
    throw error;
  } finally {
    if (connection) {
      connection.end();
    }
  }
};

export default generateRandomQuote;