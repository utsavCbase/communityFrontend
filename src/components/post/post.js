import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config';  // Update with your API base URL

const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [community, setCommunity] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Data to be sent to the backend
    const blogData = {
      title,
      content,
      community,
    };

    try {
      // Make the POST request to create a new blog post
      const response = await axios.post(`${API_BASE_URL}/blogPost/`, blogData, {
        headers: {
          'Content-Type': 'application/json',
          // Add any authorization headers if needed, e.g. Bearer token
        },
      });

      // If the request is successful, update the success state
      setSuccess(true);
      console.log('Blog post created successfully:', response.data);
      
      // Optionally clear the form after successful submission
      setTitle('');
      setContent('');
      setCommunity('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog post. Please try again.');
    }
  };

  return (
    <div className="post-container">
      <h2>Create Blog Post</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">Blog post created successfully!</p>}

      <form onSubmit={handleSubmit} className="post-form">
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

        <button type="submit">Submit Blog Post</button>
      </form>
    </div>
  );
};

export default Post;
