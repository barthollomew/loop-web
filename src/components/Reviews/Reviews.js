// Reviews.js

import React, { useEffect, useState } from 'react';
import './Reviews.css';

export const deleteUserReviews = (userName) => {
    const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const updatedReviews = allReviews.filter(review => review.userName !== userName);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
}

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    const handleDeleteReview = (index) => {
        const updatedReviews = [...reviews];
        updatedReviews.splice(index, 1);
        setReviews(updatedReviews);
        localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    }

    const handleEditReview = (index) => {
        // For simplicity, we will just prompt for a new comment.
        const newComment = prompt("Edit your comment:", reviews[index].comment);
        if (newComment) {
            const updatedReviews = [...reviews];
            updatedReviews[index].comment = newComment;
            setReviews(updatedReviews);
            localStorage.setItem('reviews', JSON.stringify(updatedReviews));
        }
    }

    useEffect(() => {
        const storedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        setReviews(storedReviews);
    }, []);

    return (
        <div className="reviews-container">
            <h2>User Reviews</h2>
            {reviews.map((review, index) => (
                <div key={index} className="review-card">
                    <h3>{review.movieTitle}</h3>
                    <p>By: {review.userName}</p>
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map(star => (
                            <span key={star}>
                                {star <= review.rating ? '★' : '☆'}
                            </span>
                        ))}
                    </div>
                    <p>{review.comment}</p>
                    {JSON.parse(localStorage.getItem('currentUser')).name === review.userName && (
                        <>
                            <button onClick={() => handleEditReview(index)}>Edit</button>
                            <button onClick={() => handleDeleteReview(index)}>Delete</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Reviews;
