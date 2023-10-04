const { Review } = require('./models');  // Assuming you have a Review model defined in models.js

exports.createReview = async (req, res) => {
  const { movieTitle, userName, comment, rating } = req.body;

  try {
    const review = await Review.create({ movieTitle, userName, comment, rating });
    res.status(201).json({ message: 'Review submitted', review });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
