import React, { useState, useEffect } from 'react';
import './ReviewModal.css';

const ReviewModal = ({ onClose }) => {
    const [movies, setMovies] = useState([]);
    const [selectedMovieid, setSelectedMovieid] = useState('');
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState('');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    useEffect(() => {
        fetch('http://localhost:3001/api/movies')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    const handleReviewSubmit = () => {
        if (comments.trim() === "" || rating < 1 || rating > 5) {
            alert("Please enter valid comments and rating.");
            return;
        }

        const review = {
            content: comments,
            rating,
            account_id: currentUser.id, // Assuming the currentUser object has an id field
            movie_id: selectedMovieid
        };

        fetch('http://localhost:3001/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert('Review Submitted!');
            onClose();
        })
        .catch(error => alert('Error submitting review:', error));
    };

    return (
        <div className="review-modal-overlay">
            <div className="review-modal">
                <h2>Review a Movie</h2>
                <select onChange={(e) => setSelectedMovieid(e.target.value)}>
                    <option value="">Select a movie...</option>
                    {movies.map(movie => (
                        <option key={movie.id} value={movie.id}>
                            {movie.title}
                        </option>
                    ))}
                </select>
                <div className="stars">
                    {[1, 2, 3, 4, 5].map(star => (
                        <span key={star} onClick={() => setRating(star)}>
                            {star <= rating ? '★' : '☆'}
                        </span>
                    ))}
                </div>
                <textarea
                    maxLength="600"
                    placeholder="Your comments..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    rows="10"
                ></textarea>
                <button onClick={handleReviewSubmit}>Submit Review</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default ReviewModal;
