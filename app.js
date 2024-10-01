import express from 'express';

import initDataBase from './server/db/init.js';
import addQuote from './server/routes/addQuote.js';

const app = express();

// Middleware for working with JSON
app.use(express.json());

const startServer = async() => {
  try {
    await initDataBase();

    app.get('/', async(req, res) => {
      res.status(200).json({ message: `All quotes` });
    })

    app.get('/add-quote', async(req, res) => {
      res.status(200).json({ message: "Add quote here" });
    })
    
    app.post('/add-quote', addQuote);

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Error starting the server: ', error);
  }
}

startServer();