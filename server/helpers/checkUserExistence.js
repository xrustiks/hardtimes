const checkUserExistence = async(connection, key, value) => {
  // Only username and email can be passed as key
  const validKeys = ['userName', 'email'];
  if (!validKeys.includes(key)) {
    throw new Error('It must be only username or email');
  }

  const userExistsQuery = `SELECT * FROM users WHERE ${key} = ?`;
  // connection.query returns an array of two arrays: the result of a query and the metadata
  // const [existingUser] is destructuring the first array
  const [existingUser] = await connection.query(userExistsQuery, [value]);

  return existingUser.length > 0;
}

export default checkUserExistence;