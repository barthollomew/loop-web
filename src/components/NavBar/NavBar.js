// NavBar.js
import React from 'react';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <a className="navbar-link" href="/">Home</a>
      <a className="navbar-link" href="/movies">Movies</a>
      <a className="navbar-link" href="/reviews">Reviews</a>
      <a className="navbar-link" href="/profile">Profile</a>
    </nav>
  );
};

export default NavBar;
