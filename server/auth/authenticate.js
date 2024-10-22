import verifyToken from './verifyToken.js';

// Middleware for verifying JWT token
export const authenticate = (req, res, next) => {
  // Getting token out of the request headers
  let token;
  if (req.headers['authorization']) {
    token = req.headers['authorization'].split(' ')[1];
  }
  // console.log('Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const verificationResult = verifyToken(token);
  // If the verification is unsuccessful, return the error message
  if (!verificationResult.success) {
    return res.status(401).json({ message: verificationResult.error });
  }
  // If the verification is successful, save the user data in the request object
  // Because the user data is needed in the next middleware/handler
  req.user = verificationResult.data;
  // console.log(`User: ${JSON.stringify(req.user)} - Path: ${req.path}`);

  // Transfers control to the next middleware or handler
  next();
};

export default authenticate;
