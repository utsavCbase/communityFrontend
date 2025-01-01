import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import './enrollInCommunity.css'; // Import the updated CSS file
import Header from '../header/header';
import Footer from '../footer/footer';

const EnrollInCommunity = () => {
  const [community, setCommunity] = useState('');
  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token exists in localStorage
    const savedToken = localStorage.getItem('token');

    if (savedToken) {
      setLoggedIn(true);
      setToken(savedToken);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleEnroll = async () => {
    if (!community) {
      setMessage('Community name is required.');
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/enrollInCommunity/`,
        { community },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage(`Successfully enrolled in the community: ${community}`);
      }
    } catch (error) {
      console.error('Error enrolling in community:', error);
      if (error.response && error.response.status === 400) {
        setMessage('Community does not exist. Please check the name and try again.');
      } else {
        setMessage('An error occurred while enrolling. Please try again later.');
      }
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <Header />
      <div className="enroll-container">
        {loggedIn ? (
          <>
            <h2>Enroll in a Community</h2>

            <div className="enroll-form">
              <input
                type="text"
                placeholder="Enter community name"
                value={community}
                onChange={(e) => setCommunity(e.target.value)}
              />
              <button onClick={handleEnroll}>Enroll</button>
            </div>

            {message && <div className="message">{message}</div>}
          </>
        ) : (
          <div className="login-info-section">
            <h3>To enroll in a community, please log in.</h3>
            <p>
              Logging in allows you to join and interact with various communities. You'll be able to
              access community posts, discussions, and much more once you are logged in.
            </p>
            <button className="login-button" onClick={navigateToLogin}>
              Go to Login
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EnrollInCommunity;
