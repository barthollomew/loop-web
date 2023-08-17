import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Movies.css';

const Movies = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedCinema, setSelectedCinema] = useState(null);

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const cinemas = ["Cinema 1", "Cinema 2", "Cinema 3"];
    const movies = [
        {
            title: "Movie 1",
            sessionTimes: ["10:00", "12:30", "15:00", "18:00"],
            imgSrc: "path/to/placeholder/image1.png"
        },
        {
            title: "Movie 2",
            sessionTimes: ["11:00", "13:30", "16:00", "19:00"],
            imgSrc: "path/to/placeholder/image2.png"
        }
    ];

    return (
        <div className="pt-16 pb-16 text-center">
            <div className="movies-container p-8">
                <div className="days flex gap-4 mb-8">
                    {days.map(day => (
                        <button
                            key={day}
                            className={`day ${selectedDay === day ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
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
                    <div className="cinemas flex gap-4 mb-8">
                        {cinemas.map(cinema => (
                            <button
                                key={cinema}
                                className={`cinema ${selectedCinema === cinema ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => setSelectedCinema(cinema)}
                            >
                                {cinema}
                            </button>
                        ))}
                    </div>
                )}

                {selectedCinema && (
                    <div className="movie-list grid gap-4">
                        {movies.map(movie => (
                            <div key={movie.title} className="movie p-4 bg-gray-200 rounded shadow">
                                <img src={movie.imgSrc} alt={movie.title} className="movie-image mb-4" />
                                <h2 className="movie-title mb-4">{movie.title}</h2>
                                <div className="session-times flex gap-4">
                                    {movie.sessionTimes.map(time => (
                                        <Link key={time} to="/SeatSelection">  
                                            <span className="time p-2 bg-blue-500 text-white rounded cursor-pointer">
                                                {time}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Movies;
