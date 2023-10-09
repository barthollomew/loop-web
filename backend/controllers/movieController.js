// movieController.js

import sequelize from '../config/database.js';

export const getMovies = async (req, res) => {
  try {
    const [movies] = await sequelize.query(`
      SELECT Movie.*, Showing.Day, Showing.Time, Showing.CinemaID 
      FROM Movie 
      LEFT JOIN Showing ON Movie.id = Showing.MovieID
    `);
    // Further process the result if needed to match the frontend's expected structure
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies: ', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};
