import { hash } from 'bcrypt';

import openConnection from '../../db/connection.js';
import checkUserExistence from '../../helpers/checkUserExistence.js';

import { logError } from '../../../utils/logging.js';

const registerUser = async(req, res) => {
  const { userName, email, password } = req.body;

  // Checking if all fields are filled
  if (!userName || !email || !password) {
    return res.status(400).json({ message: 'All fields are necessary' });
  }

  // Hashing the password with 12 rounds of salt
  const hashedPassword = await hash(password, 12);

  let connection;
  try {
    connection = await openConnection();
    await connection.query('USE quotes');

    // Checking if the user already exists
    // 1. Checking if a user with the given username is already exists
    const userCheck = await checkUserExistence(connection, 'userName', userName);
    if (userCheck) {
      return res.status(400).json({ message: 'User with this username already exists' });
    }
    // 2. Checking if a user with the given email is already exists
    const emailCheck = await checkUserExistence(connection, 'email', email);
    if (emailCheck) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // If the user doesn't exist, we add them to the database
    await connection.execute(
      `INSERT INTO users (userName, email, password) VALUES (?, ?, ?)`, 
      [userName, email, hashedPassword]
    );

    return res.status(201).json({ message: 'User successfully added' });
  } catch(error) {
    logError('Error during user registration:', error);
    return res.status(500).json({ message: 'Server error during user registration' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

export default registerUser;

// There is no password length validation in the code above, because fuck it.
// Let user choose a password of any length