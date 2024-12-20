import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import './homePage.css'; // Import the CSS file
import Header from '../header/header';

const HomePage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedEmail = localStorage.getItem('email');

    if (savedToken) {
      setLoggedIn(true);
      setToken(savedToken);
      setEmail(savedEmail);
    }
  }, []);

  const onButtonClick = () => {
    if (loggedIn) {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      setLoggedIn(false);
      setToken('');
      setEmail('');
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    if (loggedIn && token) {
      const fetchBlogs = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/users/viewAllPosts/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setBlogs(response.data);
        } catch (error) {
          console.error('Error fetching blogs:', error);
        }
      };

      fetchBlogs();
    }
  }, [loggedIn, token]);

  return (
    <div>
      <Header />
    <div className="home-container">
      <div className="title-container">
        <h2>Welcome {loggedIn ? `(${email})` : 'to the Home Page!'}</h2>
      </div>

      {loggedIn ? (
        <>
          <div className="blogs-container">
            <h3>Blogs from your enrolled community:</h3>
            <ul>
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <li key={blog.id} className="blog-item">
                    <h4>{blog.title}</h4>
                    <p>{blog.content}</p>
                  </li>
                ))
              ) : (
                <p>No blogs found for your enrolled community.</p>
              )}
            </ul>
          </div>
        </>
      ) : (
        <div className="info-message">
          Please log in to view blogs.
        </div>
      )}

      <div className="button-container">
        <input
          className="input-button"
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
      </div>
    </div>
    </div>
  );
};

export default HomePage;
