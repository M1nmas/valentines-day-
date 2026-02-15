import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStoredPlayerName, setStoredPlayerName } from '../services/localLeaderboard';

const Home = () => {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState(() => {
    const stored = getStoredPlayerName();
    return stored === 'Player' ? '' : stored;
  });

  const handleStart = () => {
    const savedName = setStoredPlayerName(playerName);
    if (!playerName) {
      setPlayerName(savedName);
    }
    navigate('/game');
  };

  return (
    <div className="home-container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      background: 'radial-gradient(circle at center, #1a0b1a 0%, #000000 100%)',
      color: 'white'
    }}>
      <h1 className="title">Neon Valentine</h1>
      <p className="subtitle">Enter the leaderboard of love</p>
      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          style={{ padding: '0.5rem 0.75rem', borderRadius: '5px', border: '1px solid #ff00ff', background: 'transparent', color: '#fff' }}
        />
        <button className="start-button" onClick={handleStart}>
          Start Game
        </button>
      </div>
    </div>
  );
};

export default Home;
