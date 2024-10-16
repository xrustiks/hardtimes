import openConnection from '../../db/connection.js';

const loginUser = async(req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are necessary' });
  }

  let connection;
  try {
    connection = await openConnection();
    await connection.query('USE quotes');

    const query = `SELECT * FROM users WHERE email = ?`;
    const [result] = await connection.query(query, [email]);
    if (result.length === 0) {
      return res.status(400).json({ message: 'User not found. You need to register first' });
    }

    return res.status(200).json({ message: 'User found' });
  } catch(error) {
    return res.status(500).json({ message: 'Server error' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

export default loginUser;