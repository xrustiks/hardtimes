import openConnection from './connection.js';

// Connect to the database
const initDataBase = async() => {
  try {
    const connection = await openConnection();
    
    const createQuotesDataBaseQuery = `CREATE DATABASE IF NOT EXISTS quotes`;
    await connection.query(createQuotesDataBaseQuery);

    console.log('Database successfully created or already exists');

    await connection.end();
  } catch (error) {
    console.error('Database error', err);
  }
}

export default initDataBase;
