const STORAGE_KEY = 'valentines_leaderboard';
const PLAYER_KEY = 'valentines_player';

export const getStoredPlayerName = () => {
  const name = (localStorage.getItem(PLAYER_KEY) || '').trim();
  return name || 'Player';
};

export const setStoredPlayerName = (name) => {
  const safeName = (name || '').trim() || 'Player';
  localStorage.setItem(PLAYER_KEY, safeName);
  return safeName;
};

export const getLocalLeaderboard = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
};

export const submitLocalScore = (username, score) => {
  const safeName = (username || '').trim() || 'Player';
  const scores = getLocalLeaderboard();
  const existing = scores.find((entry) => entry.username === safeName);

  if (existing) {
    if (score > existing.score) {
      existing.score = score;
    }
  } else {
    scores.push({ username: safeName, score });
  }

  scores.sort((a, b) => b.score - a.score);
  const topScores = scores.slice(0, 10);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(topScores));
  return topScores;
};
