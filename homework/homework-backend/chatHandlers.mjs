// homework-backend/chatHandlers.mjs
export let chats = [];

// GET /chats
export const getAllChats = (req, res) => {
  res.json(chats);
};

// POST /chats
export const addChat = (req, res) => {
  const { body } = req.body || {};
  if (!body) return res.status(400).json({ message: 'Body is required' });

  // isAuthenticated из auth.mjs кладёт в req.user данные из токена
  const login = (req.user && (req.user.username || req.user.login)) || 'user';

  const item = { user: login, body };
  chats.push(item);
  res.status(201).json(item);
};
