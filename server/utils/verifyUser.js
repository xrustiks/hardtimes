import { compare } from 'bcrypt';

const verifyUser = async(connection, email, password) => {
  // Searching for a user by email
  const query = 'SELECT password FROM users WHERE email = ?';
  // Receiving the array that contains the object with user data
  const [result] = await connection.query(query, [email]);

  // The first check is to see if the user with the given email exists
  if (result.length === 0) {
    return { success: false, message: 'Invalid email or user doesn\'t exist' };
  }

  // Extracting the hashed password from user object
  const hashedPassword = result[0].password;
  // Compare the hashed password in database with the one that sent by user
  const isPasswordCorrect = await compare(password, hashedPassword);

  console.log('Hashed password from DB:', hashedPassword);
  console.log('Password provided by user:', password);
  console.log('Comparison result:', isPasswordCorrect);

  // The second check is to see if the password is correct
  if (!isPasswordCorrect) {
    return { success: false, message: 'Invalid password' };
  }

  return { success: true, message: 'User verified successfully' };
}

export default verifyUser;