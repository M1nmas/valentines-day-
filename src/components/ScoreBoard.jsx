import React from 'react';

const ScoreBoard = ({ score, timeLeft }) => {
  return (
    <div className="scoreboard-container">
      <div className="score-box">
        <span className="label">Hearts</span>
        <span className="value">{score}</span>
      </div>
      <div className="score-box">
        <span className="label">Time</span>
        <span className="value">{timeLeft}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;
