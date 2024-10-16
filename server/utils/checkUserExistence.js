const checkUserExistence = async(connection, key, value) => {
  const validKeys = ['userName', 'email'];
  if (!validKeys.includes(key)) {
    throw new Error('It must be only username or email');
  }

  const userExistsQuery = `SELECT * FROM users WHERE ${key} = ?`;
  const [existingUser] = await connection.query(userExistsQuery, [value]);

  return {
    exists: existingUser.length > 0,
    key,
    value
  }
}

export default checkUserExistence;