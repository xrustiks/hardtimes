import openConnection from './connection.js';
import createTables from './createTables.js';

// Connect to the database
const initDataBase = async() => {
  let connection;
  try {
    connection = await openConnection();

    const query = `CREATE DATABASE IF NOT EXISTS quotes`;
    await connection.query(query);
    console.log('Database successfully created or already exists');

    await createTables(connection);
  } catch (error) {
    console.error('Database error', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export default initDataBase;
