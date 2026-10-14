const API_URL = "http://localhost:3001";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message || data.error || `Ошибка сервера: ${response.status}`,
    );
  }

  return data;
}

export function registerUser(credentials) {
  return request("/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function loginUser(credentials) {
  return request("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function getChats(token) {
  return request("/chats", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function sendChatMessage(token, body) {
  return request("/chats", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ body }),
  });
}
