import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [editedName, setEditedName] = useState(user.username);
    const [editedEmail, setEditedEmail] = useState(user.email);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || '{}');
        setUser(currentUser);
        setEditedName(currentUser.username || '');
        setEditedEmail(currentUser.email || '');
    }, []);
    
    const handleSave = () => {
        const updatedUser = { ...user, username: editedName, email: editedEmail };
        
        console.log('Updating user:', updatedUser); 
            
        // Update user in the backend
        fetch(`http://localhost:3001/api/accounts/update/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Account updated!') {
                localStorage.setItem("currentUser", JSON.stringify(data.user));
                setUser(data.user);
                setIsEditing(false);
            } else {
                console.error("Error updating user:", data.error);
            }
        })
        .catch(err => console.error("API call failed:", err));
    };
    

    const handleDelete = () => {
        const confirmation = window.confirm("Are you sure you want to delete your profile?");
        if (confirmation) {
            confirmDelete();
        }
    };

    const confirmDelete = () => {
        fetch(`http://localhost:3001/api/accounts/delete/${user.username}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Account deleted!') {
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
                    <h1>{user.username || ''}</h1>
                    <p>{user.email || ''}</p>
                    <button onClick={() => setIsEditing(true)} className="btn btn-edit">Edit</button>
                    <button onClick={handleDelete} className="btn btn-delete">Delete</button>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;
