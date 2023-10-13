const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Routers
const accountsRouter = require('./routes/accounts');
const moviesRouter = require('./routes/movies');
const reviewsRouter = require('./routes/reviews');
const showtimesRouter = require('./routes/showtimes');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/accounts', accountsRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/showtimes', showtimesRouter);

// Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
