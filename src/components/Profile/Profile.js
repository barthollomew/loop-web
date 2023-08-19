import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Profile.css';

const Profile = ({ onClose }) => {  
    const profileRef = useRef(null);

    const [user, setUser] = useState({
        name: 'User Name Placeholder',
        email: 'emailplaceholder@gmail.com',
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

    return (
        <div className="profile-popup" ref={profileRef}>
            <div className="profile-content">
                <img src="/logos/avatar.svg" alt="User Avatar" className="user-avatar" />
                <h1 className="profile-name">{user.name || 'User Name Placeholder'}</h1>
                <p className="profile-email">{user.email || 'emailplaceholder@gmail.com'}</p>
                <p className="profile-joined">Joined on {new Date(user.joinedDate || Date.now()).toLocaleDateString()}</p>

                <Link to="/Profile/ProfilePage" className="btn btn-profilePage mt-4">Go to Profile Page</Link>
            </div>
        </div>
    );
}

export default Profile;
