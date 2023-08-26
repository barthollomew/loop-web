import React, { useState } from 'react';
import './ReviewModal.css';

const ReviewModal = ({ movieTitle, onClose }) => {
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState('');

    const handleReviewSubmit = () => {
        // Validate comments and rating before storing review

        if (comments.trim() === "") {
            alert("Review comments may not be empty.");
            return;
        }

        if (comments.length > 250) {
            alert("Review comments length cannot exceed 250 characters.");
            return;
        }

        if (rating < 1 || rating > 5) {
            alert("Rating must be between 1 and 5.");
            return;
        }

        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

        const review = {
            movieTitle,
            userName: currentUser.name,
            comment: comments,
            rating
        };

        //Get current reviews from local storage
        const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));

        // Store review in local storage or API, you can add logic here
        alert('Review Submitted!'); // Just for feedback, can be removed or replaced
        onClose();
    };

    return (
        <div className="review-modal-overlay">
            <div className="review-modal">
                <h2>Review for {movieTitle}</h2>
                
                <div className="stars">
                    {[1, 2, 3, 4, 5].map(star => (
                        <span key={star} onClick={() => setRating(star)}>
                            {star <= rating ? '★' : '☆'}
                        </span>
                    ))}
                </div>
                
                <textarea
                    placeholder="Your comments..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    rows="5"
                ></textarea>

                <button onClick={handleReviewSubmit}>Submit Review</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default ReviewModal;
