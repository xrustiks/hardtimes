// async-based version of mysql2
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from a specific path
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Create a connection to the database
const openConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });
    return connection;
  } catch (error) {
    console.error("Connection error: ", error);
    throw error;
  }
}

export default openConnection;