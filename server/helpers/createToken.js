import jwt from 'jsonwebtoken';
import loadEnv from './loadEnv';

const SECRET = loadEnv();

// JWT creator
export const createToken = (user) => {
  try {
    return jwt.sign(user, SECRET);
  } catch(error) {
    console.error('Error creating token:', error);
    return null;
  }
}
