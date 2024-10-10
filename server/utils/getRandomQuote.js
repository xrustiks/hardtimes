import openConnection from '../db/connection.js';

const getRandomQuote = async (req, res) => {
  let connection;
  try {
    connection = await openConnection();
    await connection.query('USE quotes');

    const [randomQuote] = await connection.query('SELECT * FROM quotes ORDER BY RAND() LIMIT 1');
    console.log(randomQuote);
    return randomQuote;
  } catch(error) {
    console.error('Error getting random quote:', error);
    throw error;
  }
};

export default getRandomQuote;