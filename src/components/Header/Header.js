import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="logo-section">
        <a href="/logoPage">
          <img src="logo.svg" alt="Logo" className="logo" />
        </a>
      </div>

      <div className="actions-section">
        <button className="btn btn-signin mr-4">Sign In</button>
        <button className="btn btn-signup mr-4">Sign Up</button>
      </div>

      <div className="avatar-section">
        <a href="/avatarPage">
          <img src="avatar.svg" alt="Avatar" className="avatar" />
        </a>
      </div>
    </div>
  )
}

export default Header;
