import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../Profile/Profile';  
import './Header.css';

const Header = () => {
  const [isProfileVisible, setProfileVisible] = useState(false);

  return (
    <div className="header">
      <div className="logo-section">
          <Link to="/">
              <img src={process.env.PUBLIC_URL + '/logos/logo.svg'} alt="Logo" className="logo" />
          </Link>
      </div>

      <div className="actions-section">
        <Link to="/signIn">
          <button className="btn btn-signin mr-4">Sign In</button>
        </Link>
        <Link to="/signUp">
          <button className="btn btn-signup mr-4">Sign Up</button>
        </Link>
      </div>

      <div className="avatar-section" onClick={() => setProfileVisible(!isProfileVisible)}>
        <img src={process.env.PUBLIC_URL + '/logos/avatar.svg'} alt="Avatar" className="avatar" />
      </div>

      {/* Profile Component */}
      {isProfileVisible && <Profile user={{ /*pass the user data here */ }} onClose={() => setProfileVisible(false)} />}
    </div>
  );
}

export default Header;
