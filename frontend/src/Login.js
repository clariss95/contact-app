import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const requestData = { email, password };

    try {
      const response = await axios.post('http://localhost:5001/api/users/login', requestData);
      console.log('Response Data:', response.data);

      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setMessage('Login successful! Redirecting to contacts page...');
        setTimeout(() => {
          navigate('/contacts');
        }, 2000);
      } else {
        setMessage('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      setMessage('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <p>No account yet? <Link to="/register">Register here</Link></p>
    </div>
  );
};

export default Login;
