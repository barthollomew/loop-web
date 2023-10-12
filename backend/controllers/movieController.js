// movieController.js

import sequelize from '../config/database.js';

export const getMovies = async (req, res) => {
  try {
    const [moviesFromDb] = await sequelize.query(`
      SELECT Movie.*, Showing.Day, Showing.Time, Showing.CinemaID 
      FROM Movie 
      LEFT JOIN Showing ON Movie.id = Showing.MovieID
    `);

    const transformedMovies = moviesFromDb.reduce((acc, movie) => {
        if (!acc[movie.id]) {
          acc[movie.id] = {
            title: movie.title,
            imgSrc: movie.imgSrc,
            showings: {}
          };
        }
        if (movie.Day && movie.Time && movie.CinemaID) {
          if (!acc[movie.id].showings[movie.Day]) {
            acc[movie.id].showings[movie.Day] = {};
          }
          if (!acc[movie.id].showings[movie.Day][movie.CinemaID]) {
            acc[movie.id].showings[movie.Day][movie.CinemaID] = [];
          }
          acc[movie.id].showings[movie.Day][movie.CinemaID].push(movie.Time);
        }
        return acc;
    }, {});

    res.json(Object.values(transformedMovies));

    console.log(Object.values(transformedMovies));

  } catch (error) {
    console.error('Error fetching movies: ', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};
