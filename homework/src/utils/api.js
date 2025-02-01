// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const register = async (userData) => {
    try {
        const response = await api.post('/register', userData);
        return response.data
    } catch (e) {
        throw e
    }
};

export const login = async (userData) => {
    try {
        const response = await api.post('/login', userData);
       return response.data
    } catch (e) {
        throw e
    }
};

export const getChatMessages = async (token) => {
    try {
        const response = await api.get('/chats', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
       return response.data
    } catch (e) {
        throw e
    }
};


export const sendMessageToChat = async (token, body) => {
    try {
      const response = await api.post('/chats', {body}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
      return response.data
    } catch (e) {
        throw e
    }
};