import openConnection from '../../db/connection.js';

const getQuotesByCategory = async (req, res) => {
  const { category } = req.query;

  let connection;
  try {
    connection = await openConnection();
    await connection.query('USE quotes');

    let query = 'SELECT * FROM quotes';
    const params = [];

    if (category && category !== 'Все категории') {
      query += ' WHERE category = ?';
      params.push(category);
    }

    const [quotes] = await connection.execute(query, params);

    if (quotes.length === 0) {
      return res.status(404).json({ message: 'No quotes found' });
    }

    return res.status(200).json(quotes);
  } catch (error) {
    console.error('Internal server error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

export default getQuotesByCategory;