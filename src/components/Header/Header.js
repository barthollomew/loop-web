import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="logo-section">
        <Link to="/logoPage"> {/* Use Link instead of anchor tag */}
          <img src={process.env.PUBLIC_URL + '/logos/logo.svg'} alt="Logo" className="logo" />
        </Link>
      </div>

      <div className="actions-section">
        <Link to="/signIn"> {/* Use Link instead of anchor tag */}
          <button className="btn btn-signin mr-4">Sign In</button>
        </Link>
        <button className="btn btn-signup mr-4">Sign Up</button>
      </div>

      <div className="avatar-section">
        <Link to="/avatarPage"> {/* Use Link instead of anchor tag */}
          <img src={process.env.PUBLIC_URL + '/logos/avatar.svg'} alt="Avatar" className="avatar" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
