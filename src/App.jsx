import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import GamePage from './pages/GamePage';
import LeaderboardPage from './pages/LeaderboardPage';
import './App.css'; 

function App() {
  return (
    <AuthProvider>
      <Router>
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
