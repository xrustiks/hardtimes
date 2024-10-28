import openConnection from '../../db/connection.js';

import { hash, compare } from 'bcrypt';

const changePassword = async(req, res) => {
  const { oldPassword, freshPassword } = req.body;

  let connection;
  try {
    connection = await openConnection();
    await connection.query('USE quotes');

    // Exctract existing hashed password from the database
    const [userPassword] = await connection.query('SELECT password FROM users WHERE id = ?', [req.user.id]);
    // Making sure a user entered correct old password
    const checkCurrentPassword = await compare(oldPassword, userPassword[0].password);
    if (!checkCurrentPassword) {
      return res.status(400).json({ message: 'Please enter your current password correctly' });
    }

    // Hashing new password
    const hashedPassword = await hash(freshPassword, 12);
    // Add new hashed password into the database
    const query = 'UPDATE users SET password=? WHERE id=?;';
    const [result] = await connection.query(query, [hashedPassword, req.user.id]);
    if (result.rowsAffected === 0) {
      return res.status(400).json({ message: 'Failed to change password' });
    }

    return res.status(200).json({ message: 'Password changed successfully' });
  } catch(error) {
    console.error('Error changing password:', error);
    return res.status(500).json({ message: 'Server error' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

export default changePassword;