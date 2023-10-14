const express = require('express');
const router = express.Router();
const { Movie } = require('../models');

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving movies', error: err });
  }
});

// Additional routes for creating, updating, and deleting movies can be added here

module.exports = router;
