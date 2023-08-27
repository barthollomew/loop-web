import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReviewModal from "../Reviews/ReviewModal";
import "./Movies.css";

const Movies = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [currentMovieForReview, setCurrentMovieForReview] = useState("");

  const handleOpenReview = (movieTitle) => {
    setCurrentMovieForReview(movieTitle);
    setShowReviewModal(true);
  };

  const isUserAuthenticated = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    return Boolean(currentUser.name);
  };

  const navigate = useNavigate();

  const handleReviewClick = (movieTitle) => {
    if (isUserAuthenticated()) {
      handleOpenReview(movieTitle);
    } else {
      navigate("/SignIn");
    }
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const cinemas = ["Williamstown", "Melbourne Central", "West Footscray"];

  const movies = [
    {
      title: "Shrek 1",
      imgSrc: "shrek1.jpg",
      showings: {
        Monday: {
          Williamstown: ["10:00", "14:00"],

          "West Footscray": ["12:00", "18:00"],
        },
        Wednesday: { "Melbourne Central": ["10:00", "16:00"] },
        Saturday: { "West Footscray": ["11:00", "15:00"] },
      },
    },
    {
      title: "Shrek 2",
      imgSrc: "shrek2.jpg",
      showings: {
        Tuesday: { "Melbourne Central": ["10:00", "16:00", "20:00"] },
        Thursday: { Williamstown: ["09:00", "12:00"] },
        Sunday: { "West Footscray": ["12:00", "17:00"] },
      },
    },
    {
      title: "Shrek 3",
      imgSrc: "shrek3.jpg",
      showings: {
        Monday: {
          Williamstown: ["11:00", "15:00"],
          "Melbourne Central": ["14:00"],
        },
        Friday: { "West Footscray": ["10:00", "14:00", "18:00"] },
        Sunday: { "Melbourne Central": ["13:00", "17:00"] },
      },
    },
    {
      title: "Shrek 4",
      imgSrc: "shrek4.jpg",
      showings: {
        Tuesday: { "West Footscray": ["12:00", "16:00", "20:00"] },
        Wednesday: { "Melbourne Central": ["09:00", "13:00"] },
        Saturday: { Williamstown: ["11:00", "15:00"] },
      },
    },
    {
      title: "Kek",
      imgSrc: "shrekek.jpg",
      showings: {
        Tuesday: { "Melbourne Central": ["12:00", "15:00", "19:00"] },
        Friday: { Williamstown: ["13:00", "18:00"] },
        Sunday: { "West Footscray": ["11:00", "16:00"] },
      },
    },
  ];

  const filteredMovies = movies.filter(
    (movie) => movie.showings[selectedDay]?.[selectedCinema]
  );

  return (
    <div className="pt-16 pb-16 text-center">
      <div className="max-w-screen-lg mx-auto p-8">
        <div className="flex gap-4 mb-8">
          {days.map((day) => (
            <button
              key={day}
              className={`px-4 py-2 rounded ${
                selectedDay === day ? "bg-blue-500 text-white" : "bg-gray-200"
              } transition-colors duration-300`}
              onClick={() => {
                setSelectedDay(day);
                setSelectedCinema(null);
              }}
            >
              {day}
            </button>
          ))}
        </div>

        {selectedDay && (
          <div className="flex gap-4 mb-8">
            {cinemas.map((cinema) => (
              <button
                key={cinema}
                className={`px-4 py-2 rounded ${
                  selectedCinema === cinema
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                } transition-colors duration-300`}
                onClick={() => setSelectedCinema(cinema)}
              >
                {cinema}
              </button>
            ))}
          </div>
        )}

        {selectedDay && selectedCinema && (
          <div className="grid gap-4">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => {
                const showings = movie.showings[selectedDay][selectedCinema];
                return (
                  <div
                    key={movie.title}
                    className="p-4 bg-gray-200 rounded shadow-lg hover:shadow-md transition-shadow duration-300"
                  >
                    <img
                      src={process.env.PUBLIC_URL + "/images/" + movie.imgSrc}
                      alt={movie.title}
                      className="mx-auto w-32 h-32 object-cover rounded mb-4"
                    />
                    <h2 className="text-xl font-bold mb-4">{movie.title}</h2>
                    <div className="flex gap-4">
                      {showings.map((time) => (
                        <Link key={time} to="/SeatSelection">
                          <span className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700 transition-colors duration-300">
                            {time}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <button
                      onClick={() => handleReviewClick(movie.title)}
                      className="mt-2 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors duration-300"
                    >
                      Leave a Review
                    </button>
                  </div>
                );
              })
            ) : (
              <p>No movies showing on this day.</p>
            )}
          </div>
        )}

        {showReviewModal && (
          <ReviewModal
            movieTitle={currentMovieForReview}
            onClose={() => setShowReviewModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Movies;
