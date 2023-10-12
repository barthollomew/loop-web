// reviewController.js

import { Review } from '../models/review.js';  // Adjusted to ES6 syntax

export const createReview = async (req, res) => {
  const { movieId, userId, text, rating } = req.body;

  try {
    const review = await Review.create({ movieId, userId, text, rating });
    res.status(201).json({ message: 'Review submitted', review });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

