import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { register, login } from './userHandlers.mjs';
import { getAllChats, addChat } from './chatHandlers.mjs';
import { isAuthenticated } from './auth.mjs';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.mjs';
import path from 'path';

const port = 3001; // Или другой порт

export function getPort(port) {
    return port;
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Добавляем обслуживание статических файлов
app.use(express.static(path.join(process.cwd())));

// Добавляем обработчик для корневого маршрута
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.post('/register', register);




app.post('/login', login);




app.get('/chats', isAuthenticated, getAllChats);




app.post('/chats', isAuthenticated, addChat);

app.listen(getPort(port), () => {
    console.log(`Server started at http://localhost:${getPort(port)}`);
});