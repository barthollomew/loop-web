import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {  
    const [isEditing, setIsEditing] = useState(false);
    const [showDeletePopup] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: ''
    });
    const [editedName, setEditedName] = useState(user.name);
    const [editedEmail, setEditedEmail] = useState(user.email);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || '{}');
        setUser(currentUser);
        setEditedName(currentUser.name || '');
        setEditedEmail(currentUser.email || '');
    }, []);
    

    const handleSave = () => {
        const updatedUser = { ...user, name: editedName, email: editedEmail };
        
        // Update the local storage for currentUser
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const updatedUsers = users.map(u => u.username === user.username ? updatedUser : u);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        
        // Update the user state so that the display reflects the new name and email
        setUser(updatedUser);
    
        setIsEditing(false);
    };

    const handleDelete = () => {
        const confirmation = window.confirm("Are you sure you want to delete your profile?");
        if (confirmation) {
            confirmDelete();
        }
    };

    const confirmDelete = () => {
        fetch(`/api/users/delete/${user.username}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'User deleted successfully') {
                localStorage.removeItem("currentUser");
                navigate("/");
            } else {
                console.error("Error deleting user:", data.error);
            }
        })
        .catch(err => console.error("API call failed:", err));
    };
    

    return (
        <div className="profile-page">
            <img src="/logos/avatar.svg" alt="User Avatar" className="profile-avatar" />

            {isEditing ? (
                <div className="editing-section">
                    <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="input-field" />
                    <input type="email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} className="input-field" />
                    <button onClick={handleSave} className="btn btn-save">Save</button>
                </div>
            ) : (
                <div className="display-section">
                    <h1>{user.name || ''}</h1>
                    <p>{user.email || ''}</p>
                    <button onClick={() => setIsEditing(true)} className="btn btn-edit">Edit</button>
                    <button onClick={handleDelete} className="btn btn-delete">Delete</button>
                </div>
            )}

            {showDeletePopup && (
                <div className="delete-popup">
                    <p>User has been deleted</p>
                    <button onClick={confirmDelete} className="btn btn-confirmDelete">OK</button>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;
