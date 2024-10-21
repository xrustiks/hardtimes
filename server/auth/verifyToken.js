import jwt from 'jsonwebtoken';
import loadEnv from '../config/loadEnv.js';

// Verifies JWT token
export const verifyToken = (token) => {
  const SECRET = loadEnv().JWT_SECRET;
  if (!SECRET) {
    console.error('SECRET is not defined');
    return { success: false, error: 'SECRET is not defined' };
  }

  try {
    // Returns the decoded token if the verification is successful
    const decoded = jwt.verify(token, SECRET);
    return { success: true, data: decoded };
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return { success: false, error: error.message };
  }
};

export default verifyToken;