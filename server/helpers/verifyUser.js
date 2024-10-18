import { compare } from 'bcrypt';

// Checks if the user with the given email exists and if the password is correct (for login)
const verifyUser = async(connection, email, password) => {
  // Extracting the password from db for the given email
  const query = 'SELECT password FROM users WHERE email = ?';
  // Receiving the array that contains the object with user data 
  // (connection.query contains array of two arrays: user data and metadata)
  const [userData] = await connection.query(query, [email]);

  // The first check is to see if the user with the given email exists
  if (userData.length === 0) {
    return { success: false, message: 'User with this email wasn\'t found' };
  }

  // Extracting the password from user object
  const hashedPassword = userData[0].password;
  // Compare the hashed password in database with the one that sent by user
  const isPasswordCorrect = await compare(password, hashedPassword);

  // The second check is to see if the password is correct
  if (!isPasswordCorrect) {
    return { success: false, message: 'Invalid password' };
  }

  return { success: true, message: 'User verified successfully' };
}

export default verifyUser;