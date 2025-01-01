import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config'; // Update with your API base URL
import { useNavigate } from 'react-router-dom';
import './addblog.css'; // Import the CSS file
import Header from '../header/header'; // Assuming you have a header component
import Footer from '../footer/footer';

const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [community, setCommunity] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token exists in localStorage
    const savedToken = localStorage.getItem('token');
    const savedEmail = localStorage.getItem('email');

    if (savedToken) {
      setLoggedIn(true);
      setToken(savedToken);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loggedIn) {
      setError('You must be logged in to create a blog post.');
      return;
    }

    if (!image) {
      setError('An image is required to create a blog post.');
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('community', community);
    formData.append('image', image);

    try {
      // Send POST request to create the blog post
      const response = await axios.post(
        `${API_BASE_URL}/users/blogPost/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If successful, reset form and show success message
      setSuccess(true);
      setError('');
      setTitle('');
      setContent('');
      setCommunity('');
      setImage(null);
      console.log('Blog post created:', response.data);
    } catch (err) {
      setError('Failed to create blog post. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <Header />
      <div className="post-container">
        <h2>Create a New Blog Post</h2>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Blog post created successfully!</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              placeholder="Enter blog content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="community">Community</label>
            <input
              type="text"
              id="community"
              placeholder="Enter community name"
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Submit Blog Post
          </button>
        </form>

        {!loggedIn && (
          <p className="login-prompt">
            Please log in to create a blog post.
          </p>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Post;
