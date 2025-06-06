import { logError } from '../../utils/logging.js';

// Create tables in the database
const createTables = async(connection) => {
  try {
    await connection.query('USE quotes');

    // Creating quotes table
    const quotesTableQuery = `CREATE TABLE IF NOT EXISTS quotes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      quote VARCHAR(400),
      author VARCHAR(255),
      category VARCHAR(255),
      origin VARCHAR(255)
    )`;
    await connection.query(quotesTableQuery);

    // Creating users table
    const usersTableQuery = `CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userName VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      favoriteQuotes TEXT,
      isAdmin BOOLEAN DEFAULT FALSE
    )`;
    await connection.query(usersTableQuery);

    // Creating favorite_quotes table
    const favoriteQuotes = `CREATE TABLE IF NOT EXISTS favorite_quotes (
      user_id INT NOT NULL,
      quote_id INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (quote_id) REFERENCES quotes(id) ON DELETE CASCADE
    )`;
    await connection.query(favoriteQuotes);
  } catch (error) {
    logError('Error creating tables:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export default createTables;