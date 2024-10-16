import openConnection from '../../db/connection.js';
import verifyUser from '../../utils/verifyUser.js';

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
      return res.status(200).json({ message: message });
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