import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Import the CSS file for styling

const Header = () => {
  return (
    <div className="header-bar">
      <div className="header-container">
        <div className="logo">
          <h2>MyApp</h2>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/signup" className="nav-link">Signup</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/posts" className="nav-link">Posts</Link>
          <Link to="/create-post" className="nav-link">Create Post</Link>
          <Link to="/notifications" className="nav-link">Notifications</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
