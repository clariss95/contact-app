import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const requestData = { username, email, password };

    try {
      const response = await axios.post('http://localhost:5001/api/users/register', requestData);
      console.log('Response Data:', response.data);

      if (response.status === 201 && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setMessage('Registration successful! Redirecting to contacts page...');
        setTimeout(() => {
          navigate('/contacts');
        }, 2000);
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
