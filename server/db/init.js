import openConnection from './connection.js';
import createTables from './createTables.js';
import { logInfo } from '../../utils/logging.js';
import { logError } from '../../utils/logging.js';

// Connect to the database
const initDataBase = async() => {
  let connection;

  try {
    connection = await openConnection();

    const query = `CREATE DATABASE IF NOT EXISTS quotes`;
    await connection.query(query);
    logInfo('Database successfully created or already exists');

    await createTables(connection);
  } catch (error) {
    logError('Database error', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export default initDataBase;
