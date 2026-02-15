const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/api/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    return data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/api/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Registration failed');
    return data;
  } catch (error) {
    throw error;
  }
};

export const getLeaderboard = async () => {
  try {
    const response = await fetch(`${API_URL}/api/leaderboard/`);
    const data = await response.json();
    if (!response.ok) throw new Error('Failed to fetch leaderboard');
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const submitScore = async (username, score) => {
  try {
    const response = await fetch(`${API_URL}/api/score/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, score }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error('Failed to submit score');
    return data;
  } catch (error) {
    console.error(error);
  }
};
