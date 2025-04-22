import jwt from 'jsonwebtoken';
import loadEnv from '../config/loadEnv.js';
import { logError } from '../../utils/logging.js';

// Creates JWT token
const createToken = (user) => {
  const SECRET = loadEnv().JWT_SECRET;
  if (!SECRET) {
    logError('SECRET is not defined');
    return { success: false, error: 'SECRET is not defined' };
  }

  try {
    // Returns JWT token for the user with the expiration date of 30 days
    return jwt.sign(user, SECRET, { expiresIn: '30d' });
  } catch(error) {
    logError('Error creating token:', error.message);
    return { success: false, error: error.message };
  }
}

export default createToken;