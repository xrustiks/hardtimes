import jwt from 'jsonwebtoken';
import loadEnv from './loadEnv.js';

// JWT validator
export const verifyToken = (token) => {
  const SECRET = loadEnv();
  if (!SECRET) {
    console.error('SECRET is not defined');
    return { success: false, error: 'SECRET is not defined' };
  }

  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return { success: false, error: error.message };
  }
};

export default verifyToken;