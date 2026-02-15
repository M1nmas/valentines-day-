import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalLeaderboard } from '../services/localLeaderboard';

const LeaderboardPage = () => {
    const [scores, setScores] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setScores(getLocalLeaderboard());
    }, []);

    return (
        <div className="leaderboard-page-container" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh',
            background: 'radial-gradient(circle at center, #1a0b1a 0%, #000000 100%)',
            color: 'white',
            textAlign: 'center'
        }}>
        <h1 className="title" style={{ fontSize: '3rem', marginBottom: '20px' }}>Global Leaderboard</h1>
        <div className="leaderboard" style={{ margin: '20px', padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '10px', border: '1px solid #00ffff', width: '80%', maxWidth: '600px' }}>
            <h2 style={{ color: '#ff69b4', textAlign: 'center', marginBottom: '20px' }}>Top Lovers</h2>
            <table style={{ width: '100%', color: '#fff', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ borderBottom: '1px solid #ff00ff' }}>
                <th style={{ padding: '15px', textAlign: 'left', fontSize: '1.2rem', color: '#00ffff' }}>Rank</th>
                <th style={{ padding: '15px', textAlign: 'left', fontSize: '1.2rem', color: '#00ffff' }}>Name</th>
                <th style={{ padding: '15px', textAlign: 'right', fontSize: '1.2rem', color: '#00ffff' }}>Hearts</th>
                </tr>
            </thead>
            <tbody>
                {scores.map((entry, index) => (
                <tr key={index} style={{ borderBottom: '1px solid rgba(255, 0, 255, 0.3)' }}>
                    <td style={{ padding: '15px', fontSize: '1.1rem' }}>{index + 1}</td>
                    <td style={{ padding: '15px', color: '#ff69b4', fontSize: '1.1rem' }}>{entry.username}</td>
                    <td style={{ padding: '15px', textAlign: 'right', color: '#ff00ff', fontWeight: 'bold', fontSize: '1.1rem' }}>{entry.score}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        <button className="start-button" style={{ marginTop: '20px' }} onClick={() => navigate('/game')}>Back to Game</button>
        </div>
    );
};

export default LeaderboardPage;
