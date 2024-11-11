import express from 'express';
import cors from 'cors';

import initDataBase from './db/init.js';
import routes from './routes/routes.js';

const app = express();

// Turn on CORS for all routes
app.use(cors());
// Middleware for parsing incoming JSON requests
app.use(express.json());
// Use routes from routes.js
app.use(routes);

const startServer = async() => {
  try {
    await initDataBase();

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    })
  } catch (error) {
    console.error('Error starting the server: ', error);
  }
}

startServer();