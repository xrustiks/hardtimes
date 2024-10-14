// Create tables in the database
const createTables = async(connection) => {
  try {
    await connection.query('USE quotes');

    const quotesTableQuery = `CREATE TABLE IF NOT EXISTS quotes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      quote TEXT,
      author VARCHAR(255),
      category VARCHAR(255),
      origin VARCHAR(255),
      isFavorite BOOLEAN DEFAULT FALSE
    )`;
    await connection.query(quotesTableQuery);

    const usersTableQuery = `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userName VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      isAdmin BOOLEAN DEFAULT FALSE
    )`;
    await connection.query(usersTableQuery);
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