import openConnection from '../../db/connection.js';
import verifyUser from '../../helpers/verifyUser.js';
import createToken from '../../auth/createToken.js';

import { logError } from '../../../utils/logging.js';

// Component for user login
const loginUser = async(req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are necessary' });
  }

  let connection;
  try {
    connection = await openConnection();
    await connection.query('USE quotes');

    // Desctructuring the verifyUser result (object) with the result of verification
    const { success, message } = await verifyUser(connection, email, password);
    if (!success) {
      // If the user is not verified, return the message
      return res.status(400).json({ message: message });
    }

    // If the user is verified:
    // Extracting additional user data from the database
    const [user] = await connection.execute(
      'SELECT id, userName, email, isAdmin FROM users WHERE email = ?', 
      [email]
    );
    // Extracting the user data from the user array for context
    const userData = user[0];
    // Creating a token with the user data
    const token = createToken(userData);

    // Returning the message, token (for localStorage) and user data (for context)
    return res.status(200).json({ message: message, token: token, user: userData });
  } catch(error) {
    logError('Error: ', error);
    return res.status(500).json({ message: 'Server error' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

export default loginUser;