import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import { deleteUserReviews } from '../Reviews/Reviews';

const Profile = ({ onClose }) => {
  const profileRef = useRef(null);

  const [user, setUser] = useState({
    name: '',
    email: '',
    joinedDate: Date.now()
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser && currentUser.name) {
      setUser(currentUser);
    }

    function handleOutsideClick(event) {
      if (!profileRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  const handleDeleteProfile = () => {
    deleteUserReviews(user.name);
    localStorage.removeItem('currentUser');
    onClose();
    alert('Profile Deleted!');
  };

  return (
    <div className="profile-popup" ref={profileRef}>
      <div className="profile-content">
        {user.name && user.email ? (
          <>
            <img src="/logos/avatar.svg" alt="User Avatar" className="user-avatar" />
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-email">{user.email}</p>
            <p className="profile-joined">
              Joined on {new Date(user.joinedDate).toLocaleDateString()}
            </p>
            <Link to="/Profile/ProfilePage" className="btn btn-profilePage mt-4" onClick={onClose}>
              Go to Profile Page
            </Link>
            <button className="btn btn-deleteProfile mt-4" onClick={handleDeleteProfile}>
              Delete Profile
            </button>
          </>
        ) : (
          <Link to="/SignUp" className="btn btn-signUp mt-4" onClick={onClose}>
            Sign Up
          </Link>
        )}
      </div>
    </div>
  );
};

export default Profile;
