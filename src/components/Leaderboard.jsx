import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../services/api';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const data = await getLeaderboard();
        setScores(data);
      } catch (err) {
        console.error('Failed to load leaderboard', err);
      }
    };
    fetchScores();
    const interval = setInterval(fetchScores, 5000); // Polling every 5 seconds for updates
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="leaderboard" style={{ marginTop: '20px', padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '10px', border: '1px solid #00ffff' }}>
      <h2 style={{ color: '#ff69b4', textAlign: 'center', marginBottom: '10px' }}>Top Lovers</h2>
      <table style={{ width: '100%', color: '#fff', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ff00ff' }}>
            <th style={{ padding: '8px', textAlign: 'left' }}>Rank</th>
            <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '8px', textAlign: 'right' }}>Hearts</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((entry, index) => (
            <tr key={index} style={{ borderBottom: '1px solid rgba(255, 0, 255, 0.3)' }}>
              <td style={{ padding: '8px' }}>{index + 1}</td>
              <td style={{ padding: '8px', color: '#00ffff' }}>{entry.username}</td>
              <td style={{ padding: '8px', textAlign: 'right', color: '#ff00ff' }}>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
