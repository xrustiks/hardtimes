import initDataBase from './server/db/init.js';
import express from 'express';
import openConnection from './server/db/connection.js';

const app = express();

// Middleware for working with JSON
app.use(express.json());

const startServer = async() => {
  try {
    await initDataBase();

    app.post('/add-quote', async(req, res) => {
      const { quote, author, category, origin } = req.body;

      if (!quote || !author || !category || !origin) {
        return res.status(400).json({ message: "All fields are necessary" })
      }

      let connection;
      try {
        connection = await openConnection();
        await connection.query('use quotes');

        const query = `INSERT INTO quotes (quote, author, category, origin) VALUES (?, ?, ?, ?)`;
        await connection.query(query, [quote, author, category, origin]);
        res.status(201).json({ message: `Quote successfully added: ${quote}` });
      } catch(error) {
        console.log('Failed adding the quote, ' + error);
        res.status(500).json({ message: 'Server error' });
      } finally {
        if (connection) {
          await connection.end();
        }
      }
    })

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Error starting the server: ', error);
  }
}

startServer();