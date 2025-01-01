import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import Header from '../header/header';
import './signup.css'; // Import the CSS file
import Footer from '../footer/footer';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const payload = {
      username,
      email,
      region,
      password,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/users/signup/`, payload);
      console.log('Signup successful:', response.data);
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div>
      <Header />
    <div className="signup-container">
      <form onSubmit={handleSignup} className="signup-form">
        <h2>Signup</h2>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Region</label>
          <input
            type="text"
            placeholder="Enter your region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="signup-btn">Signup</button>
      </form>
    </div>
    <div>
        <Footer/>
    </div>
    </div>
  );
};

export default Signup;
