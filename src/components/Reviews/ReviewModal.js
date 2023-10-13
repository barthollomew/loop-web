import React, { useState, useEffect } from 'react';
import './ReviewModal.css';

const ReviewModal = ({ onClose }) => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState('');

    // Fetch movies when the component mounts
    useEffect(() => {
        fetch('/api/movies')
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error fetching movies:', error));
    }, []);

    const handleReviewSubmit = () => {
        // Validate comments and rating before storing review

        if (comments.trim() === "") {
            alert("Review comments may not be empty.");
            return;
        }

        if (comments.length > 600) {  // Increase limit to 600 characters
            alert("Review comments length cannot exceed 600 characters.");
            return;
        }

        if (rating < 1 || rating > 5) {
            alert("Rating must be between 1 and 5.");
            return;
        }

        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

        const review = {
            movieTitle: selectedMovie,
            userName: currentUser.name,
            comment: comments,
            rating
        };

        fetch('/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        })
        .then(response => response.json())
        .then(data => {
            alert('Review Submitted!');
            onClose();
        })
        .catch(error => alert('Error submitting review:', error));
    };

    return (
        <div className="review-modal-overlay">
            <div className="review-modal">
                <h2>Review for a Movie</h2>
                
                <select onChange={(e) => setSelectedMovie(e.target.value)}>
                    <option value="">Select a movie...</option>
                    {movies.map(movie => (
                        <option key={movie.id} value={movie.title}>
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
