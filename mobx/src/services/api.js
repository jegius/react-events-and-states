export const postItem = async (item) => {
  const response = await fetch('http://localhost:3001/api/voteItems', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: item,
      votes: 0,
    }),
  });

  return await response.json();
};

export const fetchItems = async () => {
  const response = await fetch('http://localhost:3001/api/voteItems');

  return response.json();
};

export const handleStartStop = async (isStarted) => {
  const partOfPath = isStarted ? 'stop' : 'start';
  const response = await fetch(`http://localhost:3001/api/${partOfPath}`);

  return await response.json();
};

export const removeItem = async (id) => {
  const response = await fetch(`http://localhost:3001/api/voteItems/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

export const voteItem = async (id, user) => {
  const response = await fetch(`http://localhost:3001/api/voteItems/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Unique-Identifier': user,
    },
  });

  const data = await response.json();

  return {data, ok: response.ok};
};

export const canUserVote = async (user) => {
  const response = await fetch(`http://localhost:3001/api/canVote/${user}`);

  return response.json();
};

export const isVoteStarted = async () => {
  const response = await fetch('http://localhost:3001/api/isStarted');

  return response.json();
};

export const fetchData = async (user) => {
  const response = Promise.all([fetchItems(), isVoteStarted(), canUserVote(user)]);

  return await response;
};
