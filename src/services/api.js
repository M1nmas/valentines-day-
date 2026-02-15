const API_ROOT = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const API_PREFIX = API_ROOT ? `${API_ROOT}/api` : '/api';

const parseResponse = async (response) => {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type') || '';
  const text = await response.text();

  if (contentType.includes('application/json') && text) {
    try {
      return JSON.parse(text);
    } catch (error) {
      // Fallback to text parsing when content-type lies about JSON.
    }
  }

  // Avoid JSON parse errors when the server returns HTML or plain text.
  return { message: text || response.statusText };
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_PREFIX}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await parseResponse(response);
    if (!response.ok) throw new Error(data.message || 'Login failed');
    return data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${API_PREFIX}/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await parseResponse(response);
    if (!response.ok) throw new Error(data.message || 'Registration failed');
    return data;
  } catch (error) {
    throw error;
  }
};

export const getLeaderboard = async () => {
  try {
    const response = await fetch(`${API_PREFIX}/leaderboard/`);
    const data = await parseResponse(response);
    if (!response.ok) throw new Error('Failed to fetch leaderboard');
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const submitScore = async (username, score) => {
  try {
    const response = await fetch(`${API_PREFIX}/score/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, score }),
    });
    const data = await parseResponse(response);
    if (!response.ok) throw new Error('Failed to submit score');
    return data;
  } catch (error) {
    console.error(error);
  }
};
