

import React, { useState } from 'react';
import '../styles/AdminLogin.css'
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate();

  const handleLogin = () => {

    if (username === 'admin' && password === '12345') {
      
      navigate('/admin/dashboard')
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="admin-login-container">
    <div className='admin-login-sub-container'>
      <h2>Admin Login</h2>
      <form className='adminlogform'>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="button" onClick={handleLogin} className='adminloginbtn'>
          Login
        </button>
      </form>
    </div>
    </div>
  );
};

export default AdminLogin;
