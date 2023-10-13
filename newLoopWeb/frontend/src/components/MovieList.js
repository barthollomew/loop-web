import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/movies');
                setMovies(response.data);
            } catch (err) {
                setError('Error fetching movies');
            }
        };

        fetchMovies();
    }, []);

    return (
        <div>
            <h1>Movies</h1>
            {error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {movies.map(movie => (
                        <li key={movie.id}>{movie.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MovieList;
