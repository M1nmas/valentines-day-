import React, { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/game');
    }
  }, [user, navigate]);

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
      <div style={{ marginTop: '2rem' }}>
        <LoginForm onLogin={login} />
      </div>
    </div>
  );
};

export default Home;
