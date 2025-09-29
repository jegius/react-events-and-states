export const API_URL = 'http://localhost:3001';

async function req(path, { method = 'GET', token, body } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : null; } catch { data = { error: text }; }

  if (!res.ok) {
    const err = new Error((data && (data.error || data.message)) || res.statusText);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const api = {

  register: (login, password) => req('/register', { method: 'POST', body: { username: login, password } }),
  login:    (login, password) => req('/login',    { method: 'POST', body: { username: login, password } }),
  getChats: (token)           => req('/chats',    { token }),

  sendMsg:  (token, message)  => req('/chats',    { method: 'POST', token, body: { body: message } }),
};
