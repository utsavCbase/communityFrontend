import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  const communities = [
    { name: 'Tech Enthusiasts', link: '/community/tech' },
    { name: 'Art Lovers', link: '/community/art' },
    { name: 'Fitness Gurus', link: '/community/fitness' },
    { name: 'Foodies', link: '/community/food' },
    { name: 'Travelers', link: '/community/travel' },
    { name: 'Bookworms', link: '/community/books' },
    { name: 'Music Fans', link: '/community/music' },
    { name: 'Startup Founders', link: '/community/startup' },
    { name: 'Gamers', link: '/community/gaming' },
    { name: 'Nature Explorers', link: '/community/nature' }
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div>📞 Contact: +1 234 567 890 | ✉️ support@eventsnow.com</div>
        <div>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>

      {/* Mid Bar */}
      <div className="header-bar">
        <div className="header-container">
          <div className="logo">
            <h2>EventsNow</h2>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/enroll" className="nav-link">Community Enrollement</Link>
            <Link to="/create-post" className="nav-link">Create Event</Link>
            <Link to="/posts" className="nav-link">All Events</Link>
            <Link to="/notifications" className="nav-link">Notifications</Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar">
        <div className="community-slider">
          {communities.map((community, index) => (
            <Link key={index} to={community.link} className="community">
              {community.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
