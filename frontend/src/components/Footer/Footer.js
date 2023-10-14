import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">

      {/* First Column */}
      <div className="footer-logo-section">
        <img src={process.env.PUBLIC_URL + '/logos/logo2.svg'} alt="Logo" className="footer-logo" />
      </div>

      {/* Second Column */}
      <div className="footer-links-section">
        <a className="footer-link" href="/">Home</a>
        <a className="footer-link" href="/movies">Movies</a>
        <a className="footer-link" href="/reviews">Reviews</a>
        <a className="footer-link" href="/profile">Profile</a>
      </div>

      {/* Third Column */}
      <div className="footer-social-section">
        <p>© 2023 Loop Web. Full Stack Assignment by Nathan Nguyen and Jonathan Theofilas.</p>
      </div>

    </footer>
  );
};

export default Footer;
