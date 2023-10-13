const express = require('express');
const router = express.Router();
const { Review } = require('../models');

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving reviews', error: err });
  }
});

// Additional routes for creating, updating, and deleting reviews can be added here

module.exports = router;
