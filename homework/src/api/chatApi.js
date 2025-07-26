import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const getChats = async (token) => {
  const response = await axios.get(`${API_URL}/chats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const sendMessage = async (message, token) => {
  const response = await axios.post(
    `${API_URL}/chats`,
    { body: message },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};