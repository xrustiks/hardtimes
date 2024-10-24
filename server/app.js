import express from 'express';
import cors from 'cors';

import initDataBase from './db/init.js';
import registerUser from './routes/postRoutes/registerUser.js';
import loginUser from './routes/postRoutes/loginUser.js';
import addQuote from './routes/postRoutes/addQuote.js';
import getFavorites from './routes/getRoutes/getFavorites.js';
import getRandomQuote from './routes/getRoutes/getRandomQuote.js';
import getProfile from './routes/getRoutes/getProfile.js';
import authenticate from './auth/authenticate.js';

const app = express();

// Turn on CORS for all routes
app.use(cors());
// Middleware for parsing incoming JSON requests
app.use(express.json());

const startServer = async() => {
  try {
    await initDataBase();

    // Main route for the server
    app.get('/api', async(req, res) => {
      return res.status(200).json({ message: `Hello from server` });
    })

    // Route for user registration
    app.post('/api/register', registerUser);

    // Route for user login
    app.post('/api/login', loginUser);

    // Route for getting user profile: 
    // 1st argument is the route, 
    // 2nd is the middleware function, 
    // 3rd is the handler function
    app.get('/api/profile', authenticate, getProfile);

    // Route for getting a random quote
    app.get('/api/random-quote', getRandomQuote);

    // Route for getting favorite quotes
    app.get('/api/favorites', getFavorites);

    // Route for page with a form for adding a new quote
    app.get('/api/add-quote', async(req, res) => {
      return res.status(200).json({ message: "Add quote here" });
    })

    // Route for adding a new quote
    app.post('/api/add-quote', addQuote);

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    })
  } catch (error) {
    console.error('Error starting the server: ', error);
  }
}

startServer();