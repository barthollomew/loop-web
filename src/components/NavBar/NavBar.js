// NavBar.js
import React from 'react';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <a className="navbar-link" href="/">Home</a>
      <a className="navbar-link" href="/Movies">Movies</a>
      <a className="navbar-link" href="/Reviews">Reviews</a>

    </nav>
  );
};

export default NavBar;
