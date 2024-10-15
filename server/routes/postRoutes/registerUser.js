import openConnection from '../../db/connection.js';

const registerUser = async(req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({ message: 'All fields are necessary' });
  }

  let connection;
  try {
    connection = await openConnection();
    await connection.query('USE quotes');

    const query = `INSERT INTO users (userName, email, password) VALUES (?, ?, ?)`;
    await connection.query(query, [userName, email, password]);
    return res.status(201).json({ message: 'User successfully added' });
  } catch(error) {
    console.error('Error during user registration:', error);
    return res.status(500).json({ message: 'Server error during user registration' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

export default registerUser;