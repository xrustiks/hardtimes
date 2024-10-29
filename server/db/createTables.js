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
      userName VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      favoriteQuotes TEXT,
      isAdmin BOOLEAN DEFAULT FALSE
    )`;
    await connection.query(usersTableQuery);

    const favoriteQuotes = `CREATE TABLE IF NOT EXISTS favorite_quotes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      quote_id INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE
    )`;
    await connection.query(favoriteQuotes);
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