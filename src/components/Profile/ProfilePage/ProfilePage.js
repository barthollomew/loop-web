import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = ({ user = {} }) => {  
  const [isEditing, setIsEditing] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [editedName, setEditedName] = useState(user.name || 'User Name Placeholder');
  const [editedEmail, setEditedEmail] = useState(user.email || 'emailplaceholder@gmail.com');

  const handleSave = () => {
    console.log("Updated Details:", { name: editedName, email: editedEmail });
    setIsEditing(false);
  };

  const handleDelete = () => {
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    console.log("User deleted"); 
    setShowDeletePopup(false);
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
          <h1>{user.name || 'User Name Placeholder'}</h1>
          <p>{user.email || 'emailplaceholder@gmail.com'}</p>
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
