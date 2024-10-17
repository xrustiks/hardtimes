import openConnection from '../../db/connection.js';
import verifyUser from '../../helpers/verifyUser.js';
import createToken from '../../helpers/config/createToken.js';

const loginUser = async(req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are necessary' });
  }

  let connection;
  try {
    connection = await openConnection();
    await connection.query('USE quotes');

    // Desctructuring the object with the result of verification
    const { success, message } = await verifyUser(connection, email, password);
    if (success) {
      // Extracting additional user data from the database
      const [user] = await connection.query('SELECT id, userName, isAdmin FROM users WHERE email = ?', [email]);
      // Creating a token with the user data
      const token = createToken(user[0]);
      return res.status(200).json({ message: message, token: token });
    }

    return res.status(400).json({ message: message });

  } catch(error) {
    console.error('Error: ', error);
    return res.status(500).json({ message: 'Server error' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

export default loginUser;