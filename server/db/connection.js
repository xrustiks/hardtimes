// async-based version of mysql2
import mysql from 'mysql2/promise';
import loadEnv from '../helpers/loadEnv.js';

const env = loadEnv();

// Create a connection to the database
const openConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: env.DB_HOST,
      user: env.DB_USER,
      password: env.DB_PASSWORD
    });
    return connection;
  } catch (error) {
    console.error("Connection error: ", error);
    throw error;
  }
}

export default openConnection;