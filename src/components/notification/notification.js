import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import './notification.css'; // Import the updated CSS file
import Header from '../header/header'; // Assuming you have a header component
import Footer from '../footer/footer';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
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

  useEffect(() => {
    if (loggedIn && token) {
      const fetchNotifications = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/users/notifications/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setNotifications(response.data);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };

      fetchNotifications();
    }
  }, [loggedIn, token]);

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="notification-page">
      <Header />
      <div className="notification-container">
        {loggedIn ? (
          <>
            <h2>Your Notifications</h2>
            {notifications.length > 0 ? (
              <ul className="notification-list">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                  >
                    <div className="notification-message">{notification.message}</div>
                    <div className="notification-time">
                      {new Date(notification.created_at).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No notifications available.</p>
            )}
          </>
        ) : (
          <div className="login-info-section">
            <h3>To view your notifications, please log in.</h3>
            <p>
              Logging in allows you to access your personalized notifications and stay updated with
              important information. If you don’t have an account, you can sign up easily.
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

export default Notification;
