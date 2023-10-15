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


module.exports = router;
