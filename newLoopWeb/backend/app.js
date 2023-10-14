const express = require('express');
const cors = require('cors');
const accountsRoutes = require('./routes/accounts');
// Import other routes as needed
const moviesRoutes = require('./routes/movies');
const reviewsRoutes = require('./routes/reviews');
const showtimesRoutes = require('./routes/showtimes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/accounts', accountsRoutes);
app.use('/api/movies', moviesRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/showtimes', showtimesRoutes);

// Start Server
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };