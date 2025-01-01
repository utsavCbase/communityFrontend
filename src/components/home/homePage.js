import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, IMAGE_PATH } from '../../config';
import './homePage.css';
import Header from '../header/header';
import Footer from '../footer/footer';

const HomePage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
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
          setRecentBlogs(response.data.slice(0, 10)); // Get the most recent 10 blogs
        } catch (error) {
          console.error('Error fetching blogs:', error);
        }
      };

      fetchBlogs();
    }
  }, [loggedIn, token]);

  const handlePrevClick = () => {
    setCarouselIndex(carouselIndex === 0 ? recentBlogs.length - 1 : carouselIndex - 1);
  };

  const handleNextClick = () => {
    setCarouselIndex(carouselIndex === recentBlogs.length - 1 ? 0 : carouselIndex + 1);
  };

  return (
    <div>
      <Header />
      <div className="home-container">
        
        {/* Most Recent Blogs Section (Carousel) */}
        <div className="recent-blogs-section">
          <h3>Most Recent Blogs</h3>
          <div className="carousel-container">
            <button className="carousel-arrow left" onClick={handlePrevClick}>
              &lt;
            </button>
            <div className="carousel" style={{ scrollBehavior: 'smooth' }}>
              {recentBlogs.length > 0 ? (
                recentBlogs.map((blog, index) => (
                  <div
                    key={blog.id}
                    className={`carousel-item ${index === carouselIndex ? 'active' : ''}`}
                  >
                    <div 
                      className="blog-card" 
                      style={{ backgroundImage: `url(${IMAGE_PATH}${blog.image})` }}
                    >
                      <h4>{blog.title}</h4>
                      <p>{blog.content.substring(0, 100)}...</p>
                      <a href={`/blogs/${blog.id}`} className="read-more-btn">Read More</a>
                    </div>
                  </div>
                ))
              ) : (
                <p>No recent blogs available.</p>
              )}
            </div>
            <button className="carousel-arrow right" onClick={handleNextClick}>
              &gt;
            </button>
          </div>
        </div>

        {/* All Blogs Section */}
        <div className="all-blogs-section">
          <h3>All Blogs</h3>
          <div className="blogs-list">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div 
                  key={blog.id} 
                  className="blog-card" 
                  style={{ backgroundImage: `url(${IMAGE_PATH}${blog.image})` }}
                >
                  <h4>{blog.title}</h4>
                  <p>{blog.content}</p>
                  <div className="read-more">
                    <a href={`/blogs/${blog.id}`} className="read-more-btn">Read More</a>
                  </div>
                </div>
              ))
            ) : (
              <p>No blogs found for your enrolled community.</p>
            )}
          </div>
        </div>

        <div className="button-container">
          <input
            className="input-button"
            type="button"
            onClick={onButtonClick}
            value={loggedIn ? 'Log out' : 'Log in'}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
