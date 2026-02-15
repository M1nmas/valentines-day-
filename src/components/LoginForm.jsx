import React, { useState } from 'react';
import { loginUser, registerUser } from '../services/api';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isLogin) {
        await loginUser(username, password);
      } else {
        await registerUser(username, password);
      }
      onLogin(username);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="title" style={{ fontSize: '2rem' }}>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ff00ff', background: 'transparent', color: '#fff' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ff00ff', background: 'transparent', color: '#fff' }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="start-button" style={{ marginTop: '1rem' }}>
          {isLogin ? 'Enter Game' : 'Join'}
        </button>
      </form>
      <p style={{ marginTop: '1rem', fontSize: '0.8rem', cursor: 'pointer', color: '#00ffff' }} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
      </p>
    </div>
  );
};

export default LoginForm;
