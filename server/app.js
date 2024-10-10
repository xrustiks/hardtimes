import express from 'express';
import cors from 'cors';

import initDataBase from './db/init.js';
import addQuote from './routes/addQuote.js';
import getFavorites from './routes/getFavorites.js';
import getRandomQuote from './routes/getRandomQuote.js';

const app = express();

// Turn on CORS for all routes
app.use(cors());
// Middleware for working with JSON
app.use(express.json());

const startServer = async() => {
  try {
    await initDataBase();

    app.get('/api/', async(req, res) => {
      res.status(200).json({ message: `All quotes` });
    })

    app.get('/api/random-quote', getRandomQuote);

    app.get('/api/favorites', getFavorites);

    app.get('/api/add-quote', async(req, res) => {
      res.status(200).json({ message: "Add quote here" });
    })

    app.post('/api/add-quote', addQuote);

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    })
  } catch (error) {
    console.error('Error starting the server: ', error);
  }
}

startServer();