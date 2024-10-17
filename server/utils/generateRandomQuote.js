import openConnection from '../db/connection.js';

const generateRandomQuote = async () => {
  let connection;
  try {
    connection = await openConnection();
    await connection.query('USE quotes');
    // connection.query returns an array of two arrays: the result of a query and the metadata
    // const [randomQuote] is destructuring the first array
    const [randomQuote] = await connection.query('SELECT * FROM quotes ORDER BY RAND() LIMIT 1');

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