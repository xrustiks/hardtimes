import verifyToken from './verifyToken.js';

// Middleware for verifying JWT token
export const authenticate = (req, res, next) => {
  // Getting token out of the request headers
  const token = req.headers['authorization']?.split(' ')[1];
  // console.log('Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const verificationResult = verifyToken(token);
  console.log('Verification result: ', verificationResult);
  // If the verification is unsuccessful, return the error message
  if (!verificationResult.success) {
    return res.status(401).json({ message: verificationResult.error });
  }
  // If the verification is successful, save the user data in the request object
  req.user = verificationResult.data;
  console.log('Before next');
  console.log('User data:', req.user);
  // Transfers control to the next middleware or handler
  next();
};

export default authenticate;
