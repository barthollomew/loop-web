import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReviewModal from './ReviewModal';
import './Reviews.css';

export const deleteUserReviews = (userName) => {
  const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  const updatedReviews = allReviews.filter((review) => review.userName !== userName);
  localStorage.setItem('reviews', JSON.stringify(updatedReviews));
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const [showModal, setShowModal] = useState(false);

  const handleDeleteReview = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews.splice(index, 1);
    setReviews(updatedReviews);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
  };

  const handleEditReview = (index) => {
    const newComment = prompt('Edit your comment:', reviews[index].comment);
    if (newComment) {
      const updatedReviews = [...reviews];
      updatedReviews[index].comment = newComment;
      setReviews(updatedReviews);
      localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    }
  };

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch('/api/users/auth')
    .then(response => response.json())
    .then(data => setLoggedIn(data.loggedIn))
    .catch(error => console.error('Error checking auth:', error));
}, []);


return (
  <div className="reviews-container">
    <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
    {loggedIn ? (
      <>
        <button onClick={() => setShowModal(true)}>Leave a Review</button> 
        {showModal && <ReviewModal onClose={() => setShowModal(false)} />}
        {reviews.map((review, index) => (
          <div key={index} className="review-card mb-4 p-4 border rounded">
            <h3 className="text-lg font-semibold">{review.movieTitle}</h3>
            <p className="text-sm text-gray-500">By: {review.userName}</p>
            <div className="stars my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="mr-1">
                  {star <= review.rating ? '★' : '☆'}
                </span>
              ))}
            </div>
            <p>{review.comment}</p>
            {currentUser.name === review.userName && (
              <>
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleEditReview(index)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline ml-4"
                  onClick={() => handleDeleteReview(index)}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
        </>
      ) : (
        // New user or not signed in
        <div className="mt-4">
          <p>Sign up to post a review!</p>
          <Link
            to="/SignUp"
            className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Reviews;
