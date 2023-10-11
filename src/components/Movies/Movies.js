import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReviewModal from "../Reviews/ReviewModal";
import "./Movies.css";

const Movies = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [currentMovieForReview, setCurrentMovieForReview] = useState("");
  const [movies, setMovies] = useState([]);
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
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/movies");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        // Consider setting an error state here to inform the user
      }
    };
    fetchMovies();
  }, []);

  const navigate = useNavigate();

  const handleOpenReview = (movieTitle) => {
    setCurrentMovieForReview(movieTitle);
    setShowReviewModal(true);
  };

  const isUserAuthenticated = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    return Boolean(currentUser.name);
  };

  const handleReviewClick = (movieTitle) => {
    if (isUserAuthenticated()) {
      handleOpenReview(movieTitle);
    } else {
      navigate("/SignIn");
    }
  };

  const filteredMovies = movies.filter(
    (movie) => movie.showings && movie.showings[selectedDay]?.[selectedCinema]
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
            {movies.filter(
              (movie) => movie.showings[selectedDay]?.[selectedCinema]
            ).length > 0 ? (
              movies
                .filter(
                  (movie) => movie.showings[selectedDay]?.[selectedCinema]
                )
                .map((movie) => {
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
