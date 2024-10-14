import openConnection from '../db/connection.js';

const postRegister = async(req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).send('All fields are necessary');
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
    return res.status(500).json('Something went wrong');
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

export default postRegister;