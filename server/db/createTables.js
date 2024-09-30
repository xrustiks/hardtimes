// Create tables in the database
const createTables = async(connection) => {
  try {
    await connection.query('USE quotes');

    const quotesTableQuery = `CREATE TABLE IF NOT EXISTS quotes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      quote TEXT,
      author VARCHAR(255),
      category VARCHAR(255),
      origin VARCHAR(255)
    )`;

    await connection.query(quotesTableQuery);
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export default createTables;