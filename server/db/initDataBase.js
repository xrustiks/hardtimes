import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Connection error: ', err);
  }

  console.log('Successful connection to the database');

  // Create the database
  const createQuotesDataBaseQuery = `CREATE DATABASE IF NOT EXISTS quotes`;

  connection.query(createQuotesDataBaseQuery, (err, results) => {
    if (err) {
      console.error('Error creating the database: ', err);
    }

    console.log('Database successfully created or already exists');
  });

  connection.end();
})