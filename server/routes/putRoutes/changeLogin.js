import openConnection from '../../db/connection.js'

const changeLogin = async(req, res) => {
  const { freshLogin } = req.body;

  let connection;
  try {
    connection = await openConnection();
    await connection.query('USE quotes');

    const query = 'UPDATE users SET userName=? WHERE id=?;';
    const [result] = await connection.query(query, [freshLogin, req.user.id]);
    if (result.rowsAffected === 0) {
      return res.status(400).json({ message: 'Failed to change login' });
    }

    return res.status(200).json({ message: 'Login changed successfully', user: req.user });
  } catch(error) {
    console.error('Error changing login:', error);
    return res.status(500).json({ message: 'Server error' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

export default changeLogin;