// homework-backend/auth.mjs
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'your-secret-key';

export const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader)

  if (!authHeader) {
    console.log("No authorization header provided");
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
   console.log("Received Token:", token)
  if (!token) {
      console.log("No token found in header");
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
        console.log("Token verification failed:", err);
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
        console.log("Token decoded:", decoded);
    req.user = decoded;
    next();
  });
};