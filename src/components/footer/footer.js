import React from 'react';
import './footer.css'; // Make sure to import the CSS styles

const Footer = () => {
  return (
    <div className="footer">
      {/* Footer Info Section */}
      <div className="footer-info">
        <p>&copy; 2024 YourCompany. All rights reserved.</p>
        <p>Providing reliable solutions for all your business needs.</p>
      </div>

      {/* Footer Links Section */}
      <div className="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">FAQ</a>
      </div>

      {/* Social Media Icons */}
      <div className="social-icons">
        <a href="#" className="facebook">🔗</a>
        <a href="#" className="twitter">🔗</a>
        <a href="#" className="linkedin">🔗</a>
      </div>
    </div>
  );
};

export default Footer;
