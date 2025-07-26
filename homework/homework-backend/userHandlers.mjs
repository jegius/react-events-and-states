import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

let users = [];
export const getAllChats = (req, res) => {
    res.json(chats); // Должен возвращать массив
};
export const addChat = (req, res) => {
    const { body } = req.body;
    const { user } = req;
    const newMessage = { 
        username: user.username, 
        body,
        createdAt: new Date().toISOString()
    };
    chats.push(newMessage);
    res.status(201).json(newMessage); // Возвращаем созданное сообщение
};
export const register = (req, res) => {
    const { username, password } = req.body;
    
    if(!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    if(users.some(user => user.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    
    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        users.push({ username, password: hashedPassword });
        res.status(201).json({ message: 'Registered successfully', username });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed' });
    }
};

export const login = (req, res) => {
    const { username, password } = req.body;
    
    if(!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = users.find(user => user.username === username);
    
    if(!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    if(!bcrypt.compareSync(password, user.password)) {
        return res.status(403).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ username: user.username }, 'your_jwt_secret_key');
    res.json({ token, username: user.username });
};