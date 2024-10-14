import express from 'express';
import cors from 'cors';

import initDataBase from './db/init.js';
import postRegister from './routes/postRegister.js';
import postQuote from './routes/postQuote.js';
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

    // Main route for the server
    app.get('/api', async(req, res) => {
      return res.status(200).json({ message: `Hello from server` });
    })

    app.post('/api/register', postRegister);

    // Route for getting a random quote
    app.get('/api/random-quote', getRandomQuote);

    // Route for getting all favorite quotes
    app.get('/api/favorites', getFavorites);

    // Route for page with a form for adding a new quote
    app.get('/api/post-quote', async(req, res) => {
      return res.status(200).json({ message: "Add quote here" });
    })

    // Route for adding a new quote
    app.post('/api/post-quote', postQuote);

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    })
  } catch (error) {
    console.error('Error starting the server: ', error);
  }
}

startServer();