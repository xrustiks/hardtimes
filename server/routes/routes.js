import express from 'express';

import registerUser from './postRoutes/registerUser.js';
import loginUser from './postRoutes/loginUser.js';
import addQuote from './postRoutes/addQuote.js';
import getFavorites from './getRoutes/getFavorites.js';
import getRandomQuote from './getRoutes/getRandomQuote.js';
import getProfile from './getRoutes/getProfile.js';
import getAddQuotePage from './getRoutes/getAddQuotePage.js';
import changeLogin from './putRoutes/changeLogin.js';
import changeEmail from './putRoutes/changeEmail.js';
import changePassword from './putRoutes/changePassword.js';
import addToFavorites from './postRoutes/addToFavorites.js';
import removeFromFavorites from './deleteRoutes/removeFromFavorites.js';
import getSearchedQuotes from './getRoutes/getSearchedQuotes.js';
import getCategories from './getRoutes/getCategories.js';
import checkAdmin from '../auth/checkAdmin.js';
import authenticate from '../auth/authenticate.js';

const router = express.Router();

// MAIN ROUTE
// Main route for the server
router.get('/api', async(req, res) => {
  return res.status(200).json({ message: `Hello from server` });
})

// AUTHENTICATION ROUTES
// Route for user registration
router.post('/api/register', registerUser);
// Route for user login
router.post('/api/login', loginUser);

// PROFILE ROUTES
// Route for getting user profile: 
// 1st argument is the route, 
// 2nd is the middleware function, 
// 3rd is the handler function
router.get('/api/profile', authenticate, getProfile);
// Route for profile settings: changing login
router.put('/api/profile/settings/change-login', authenticate, changeLogin);
// Route for profile settings: changing email
router.put('/api/profile/settings/change-email', authenticate, changeEmail);
// Route for profile settings: changing password
router.put('/api/profile/settings/change-password', authenticate, changePassword);

// FAVORITES ROUTES
// Route for getting favorite quotes
router.get('/api/favorites', authenticate, getFavorites);
// Routes for adding and deleting a quote to/from favorites
router.post('/api/addToFavorites', authenticate, addToFavorites);
router.delete('/api/removeFromFavorites', authenticate, removeFromFavorites);

// QUOTES ROUTES
// Route for getting a random quote
router.get('/api/random-quote', getRandomQuote);
// Route for page with a form for adding a new quote
router.get('/api/add-quote', authenticate, checkAdmin, getAddQuotePage);
// Route for adding a new quote
router.post('/api/add-quote', authenticate, checkAdmin, addQuote);
// Route for searching quotes
router.get('/api/search-quotes/:query', getSearchedQuotes);

// CATEGORIES ROUTES
// Route for getting categories
router.get('/api/get-categories', getCategories);

export default router;