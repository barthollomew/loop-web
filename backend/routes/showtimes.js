const express = require('express');
const router = express.Router();
const { Showtime } = require('../models');

// Get all showtimes
router.get('/', async (req, res) => {
  try {
    const showtimes = await Showtime.findAll();
    res.status(200).json(showtimes);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving showtimes', error: err });
  }
});

// Additional routes for creating, updating, and deleting showtimes can be added here

module.exports = router;
