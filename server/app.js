import express from 'express';
import cors from 'cors';

import initDataBase from './db/init.js';
import registerUser from './routes/postRoutes/registerUser.js';
import loginUser from './routes/postRoutes/loginUser.js';
import addQuote from './routes/postRoutes/addQuote.js';
import getFavorites from './routes/getRoutes/getFavorites.js';
import getRandomQuote from './routes/getRoutes/getRandomQuote.js';
import getProfile from './routes/getRoutes/getProfile.js';
import getAddQuotePage from './routes/getRoutes/getAddQuotePage.js';
import changeLogin from './routes/putRoutes/changeLogin.js';
import changeEmail from './routes/putRoutes/changeEmail.js';
import changePassword from './routes/putRoutes/changePassword.js';
import addToFavorites from './routes/postRoutes/addToFavorites.js';
import removeFromFavorites from './routes/deleteRoutes/removeFromFavorites.js';
import getSearchedQuotes from './routes/getRoutes/getSearchedQuotes.js';
import checkAdmin from './auth/checkAdmin.js';
import authenticate from './auth/authenticate.js';

const app = express();

// Turn on CORS for all routes
app.use(cors());
// Middleware for parsing incoming JSON requests
app.use(express.json());

const startServer = async() => {
  try {
    await initDataBase();

    // MAIN ROUTE
    // Main route for the server
    app.get('/api', async(req, res) => {
      return res.status(200).json({ message: `Hello from server` });
    })

    // AUTENTICATION ROUTES
    // Route for user registration
    app.post('/api/register', registerUser);
    // Route for user login
    app.post('/api/login', loginUser);

    // PROFILE ROUTES
    // Route for getting user profile: 
    // 1st argument is the route, 
    // 2nd is the middleware function, 
    // 3rd is the handler function
    app.get('/api/profile', authenticate, getProfile);
    // Route for profile settings: changing login
    app.put('/api/profile/settings/change-login', authenticate, changeLogin);
    // Route for profile settings: changing email
    app.put('/api/profile/settings/change-email', authenticate, changeEmail);
    // Route for profile settings: changing password
    app.put('/api/profile/settings/change-password', authenticate, changePassword);

    // FAVORITES ROUTES
    // Route for getting favorite quotes
    app.get('/api/favorites', authenticate, getFavorites);
    // Routes for adding and deleting a quote to/from favorites
    app.post('/api/addToFavorites', authenticate, addToFavorites);
    app.delete('/api/removeFromFavorites', authenticate, removeFromFavorites);
    
    // QUOTES ROUTES
    // Route for getting a random quote
    app.get('/api/random-quote', getRandomQuote);
    // Route for page with a form for adding a new quote
    app.get('/api/add-quote', authenticate, checkAdmin, getAddQuotePage);
    // Route for adding a new quote
    app.post('/api/add-quote', authenticate, checkAdmin, addQuote);
    // Route for searching quotes
    app.get('/api/search-quotes', getSearchedQuotes);

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    })
  } catch (error) {
    console.error('Error starting the server: ', error);
  }
}

startServer();