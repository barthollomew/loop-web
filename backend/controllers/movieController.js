// movieController.js

const sequelize = require('../config/database');

exports.getMovies = async (req, res) => {
  try {
    const [movies] = await sequelize.query("SELECT * FROM movies");
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies: ', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};
