import jwt from 'jsonwebtoken';
import loadEnv from '../config/loadEnv.js';

// Creates JWT token
const createToken = (user) => {
  const SECRET = loadEnv().JWT_SECRET;
  if (!SECRET) {
    console.error('SECRET is not defined');
    return { success: false, error: 'SECRET is not defined' };
  }

  try {
    return jwt.sign(user, SECRET, { expiresIn: '30d' });
  } catch(error) {
    console.error('Error creating token:', error.message);
    return { success: false, error: error.message };
  }
}

export default createToken;