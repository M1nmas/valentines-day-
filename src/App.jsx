import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import GamePage from './pages/GamePage';
import LeaderboardPage from './pages/LeaderboardPage';
import songUrl from './assets/Apna Bana Le (PenduJatt.Com.Se).mp3';
import './App.css'; 

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Audio playback error:", error);
          setIsPlaying(false);
        }
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <AuthProvider>
      <Router>
        <div className="music-controls" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
          <button 
            onClick={toggleMusic}
            style={{
              padding: '10px 20px',
              borderRadius: '20px',
              border: '2px solid #ff00ff',
              background: 'rgba(0, 0, 0, 0.7)',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
              boxShadow: '0 0 10px #ff00ff'
            }}
          >
            {isPlaying ? 'Pause Music' : 'Play Music'}
          </button>
        </div>
        <audio ref={audioRef} src={songUrl} loop preload="auto" />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
