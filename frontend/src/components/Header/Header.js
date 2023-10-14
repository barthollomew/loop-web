import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import "./Header.css";

const Header = () => {
  const [isProfileVisible, setProfileVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate(); // Using useNavigate for navigation

  useEffect(() => {
    // Function to update user state based on local storage
    const updateUser = () => {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      setCurrentUser(user);
    };
    
    // Add event listener for storage changes
    window.addEventListener('storage', updateUser);

    // Call updateUser to set initial user state
    updateUser();

    // Cleanup: remove event listener on component unmount
    return () => window.removeEventListener('storage', updateUser);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  const handleAvatarClick = () => {
    if (currentUser) {
      navigate("/Profile/ProfilePage"); // Navigate to ProfilePage
    } else {
      navigate("/signUp"); // Navigate to SignUp
    }
  };

  return (
    <div className="header">
      <div className="logo-section">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/logos/logo.svg"}
            alt="Logo"
            className="logo"
          />
        </Link>
      </div>

      <div className="actions-section">
        {/* Conditional rendering based on currentUser */}
        {currentUser ? (
          <button className="btn btn-signout mr-4" onClick={handleSignOut}>
            Sign Out
          </button>
        ) : (
          <>
            <Link to="/signIn">
              <button className="btn btn-signin mr-4">Sign In</button>
            </Link>
            <Link to="/signUp">
              <button className="btn btn-signup mr-4">Sign Up</button>
            </Link>
          </>
        )}
      </div>

      <div className="avatar-section" onClick={handleAvatarClick}>
        <img
          src={process.env.PUBLIC_URL + "/logos/avatar.svg"}
          alt="Avatar"
          className="avatar"
        />
      </div>
      {isProfileVisible && (
        <Profile user={currentUser} onClose={() => setProfileVisible(false)} />
      )}
    </div>
  );
};

export default Header;
