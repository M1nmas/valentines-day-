import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Stars, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Heart from './components/Heart';
import ScoreBoard from './components/ScoreBoard';
import './App.css'; 

const GAME_DURATION = 30; // seconds

export default function App() {
  const [hearts, setHearts] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameState, setGameState] = useState('start'); // start, playing, gameover

  useEffect(() => {
    let interval;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState('gameover');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      const spawnInterval = setInterval(() => {
        spawnHeart();
      }, 600); // Faster spawn for more action
      return () => clearInterval(spawnInterval);
    }
  }, [gameState]);

  const spawnHeart = () => {
    const x = (Math.random() - 0.5) * 25; 
    const y = (Math.random() - 0.5) * 15;
    const z = (Math.random() - 0.5) * 10;
    const id = Date.now() + Math.random();
    // Neon colors
    const colors = ['#ff00ff', '#ff0055', '#cc00ff', '#ff33cc']; 
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    setHearts((prev) => [...prev, { id, position: [x, y, z], color }]);
  };

  const handleCollect = (id) => {
    if (gameState !== 'playing') return;
    setHearts((prev) => prev.filter((h) => h.id !== id));
    setScore((prev) => prev + 1);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setHearts([]);
    setGameState('playing');
  };

  return (
    <div className="app-container">
      <Canvas className="canvas" dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 25]} />
        
        {/* Mood Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ff00ff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00ffff" />
        
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
        
        {/* Environment */}
        <Stars radius={100} depth={50} count={7000} factor={4} saturation={1} fade speed={2} />
        <Sparkles count={500} scale={30} size={4} speed={0.4} opacity={0.5} color="#fff" />
        
        {/* Hearts */}
        {hearts.map((heart) => (
          <Heart 
            key={heart.id}
            position={heart.position}
            color={heart.color}
            onClick={() => handleCollect(heart.id)}
          />
        ))}

        {/* POST PROCESSING - BLOOM */}
        <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} radius={0.6} />
        </EffectComposer>
      </Canvas>

      {gameState === 'playing' && (
        <ScoreBoard score={score} timeLeft={timeLeft} />
      )}

      {gameState === 'start' && (
        <div className="overlay">
          <h1 className="title">Neon<br/>Valentine</h1>
          <p className="subtitle">Catch the glowing hearts before time runs out</p>
          <button className="start-button" onClick={startGame}>
            Start Game
          </button>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="overlay">
          <h1 className="title">Time's Up!</h1>
          <p className="score-text">{score}</p>
          <p className="subtitle" style={{ fontSize: '1.2rem', color: '#ff69b4' }}>Hearts Collected</p>
          <button className="start-button" onClick={startGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
