const express = require('express');
const { Review, Account, Movie } = require('../models'); // Assuming you have models structured this way
const router = express.Router();

// GET reviews by username
router.get('/user/:username', async (req, res) => {
  try {
      const { username } = req.params;

      // Find the user's ID by their username
      const user = await Account.findOne({
          where: { username: username }
      });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Find reviews by the user's ID
      const reviews = await Review.findAll({
          where: { account_id: user.id }, // Using the user's ID
          include: [Movie] 
      });

      res.status(200).json(reviews);
  } catch (err) {
      res.status(500).json({ message: 'Error retrieving reviews', error: err.message });
  }
});


// POST a review
router.post('/', async (req, res) => {
  try {
      const { content, rating, account_id, movie_id } = req.body; // Update this

      // Log received payload for debugging
      console.log('Received payload:', req.body);

      // Add additional val_idation as needed

      const newReview = await Review.create({ content, rating, account_id, movie_id }); // Update this
      res.status(201).json({ message: 'Review created!', review: newReview });
  } catch (err) {
      // Log detailed error information
      console.error('Error creating review:', err);
      console.error('Error stack:', err.stack);
      
      res.status(500).json({ message: 'Error creating review', error: err.message });
  }
});


// PUT (update) a review
router.put('/:review_id', async (req, res) => {
    try {
        const { review_id } = req.params;
        const { content, rating } = req.body;

        // Add additional val_idation as needed

        const review = await Review.findByPk(review_id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        review.content = content;
        review.rating = rating;

        await review.save();
        res.status(200).json({ message: 'Review updated!', review });
    } catch (err) {
        res.status(500).json({ message: 'Error updating review', error: err.message });
    }
});

// DELETE a review
router.delete('/:review_id', async (req, res) => {
    try {
        const { review_id } = req.params;

        const review = await Review.findByPk(review_id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        await review.destroy();
        res.status(200).json({ message: 'Review deleted!' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting review', error: err.message });
    }
});

module.exports = router;
