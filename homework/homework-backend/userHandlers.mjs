//  homework-backend/userHandlers.mjs
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'your-secret-key';
let users = [];

export const register = (req, res) => {
  const { username, password } = req.body;
  if (users.some((user) => user.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { username, password: hashedPassword };
  users.push(newUser);
  // Generate token for registration
  const token = jwt.sign({ username: newUser.username }, secret, {
    expiresIn: '1h', //Optional
  });
  res.status(201).json({ message: 'Registered successfully', token });
};

export const login = (req, res) => {
    const { username, password } = req.body;
    let user = users.find(user => user.username === username);
    if(!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: 'Username or password is incorrect' });
    }
    const token = jwt.sign({username: user.username}, secret, {expiresIn: '1h'});
    res.json({ token });
};