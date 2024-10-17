import jwt from 'jsonwebtoken';
import loadEnv from './loadEnv';

const SECRET = loadEnv();

// JWT validator
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    console.error('Error verification token:', error);
    return null;
  }
};