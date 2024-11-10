import openConnection from '../../db/connection.js';
import createToken from '../../auth/createToken.js';

const changeEmail = async(req, res) => {
  const { freshEmail } = req.body;

  let connection;
  try {
    connection = await openConnection();
    await connection.query('USE quotes');

    const query = 'UPDATE users SET email=? WHERE id=?;';
    const [result] = await connection.execute(query, [freshEmail, req.user.id]);
    if (result.rowsAffected === 0) {
      return res.status(400).json({ message: 'Failed to change email' });
    }

    // Fetch the updated user data
    const [user] = await connection.execute('SELECT id, userName, email, isAdmin FROM users WHERE id = ?', [req.user.id]);
    const updatedUser = user[0];

    // Generate a new token with the updated user data
    const newToken = createToken(updatedUser);

    return res.status(200).json({ message: 'Email changed successfully', token: newToken });
  } catch(error) {
    console.error('Error changing email:', error);
    return res.status(500).json({ message: 'Server error' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

export default changeEmail;