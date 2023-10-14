import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import ReviewModal from "./ReviewModal";
import "./Reviews.css";

export const deleteUserReviews = (userName) => {
  fetch(`http://localhost:3001/api/reviews/user/${userName}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      alert("User reviews deleted!");
    })
    .catch((error) => console.error("Error deleting reviews:", error));
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  const fetchReviews = useCallback(() => {
    // <--- Wrap with useCallback
    fetch(`http://localhost:3001/api/reviews/user/${currentUser.username}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched reviews:", data);
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          console.error("Fetched data is not an array:", data);
          setReviews([]);
        }
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [currentUser.username]); // <--- Add dependencies

  useEffect(() => {
    if (currentUser.username) {
      fetchReviews();
    }
  }, [currentUser.username, fetchReviews]); // <--- Add fetchReviews to dependencies

  const handleDeleteReview = (reviewId) => {
    fetch(`http://localhost:3001/api/reviews/${reviewId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Review Deleted!");
        fetchReviews();
      })
      .catch((error) => console.error("Error deleting review:", error));
  };

  return (
    <div className="reviews-container">
      <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
      {currentUser.username ? (
        <>
          <button onClick={() => setShowModal(true)}>Leave a Review</button>
          {showModal && <ReviewModal onClose={() => setShowModal(false)} />}
          {reviews.map((review, index) => (
            <div key={index} className="review-card mb-4 p-4 border rounded">
              <h3 className="text-lg font-semibold">{review.Movie.title}</h3>
              <p className="text-sm text-gray-500">By: {review.userName}</p>
              <div className="stars my-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="mr-1">
                    {star <= review.rating ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <p>{review.content}</p>
              {currentUser.username === review.userName && (
                <>
                  <button
                    className="text-red-500 hover:underline ml-4"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </>
      ) : (
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
