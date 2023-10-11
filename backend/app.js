import cors from 'cors';

import express from 'express';
import userRoutes from './routes/userRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import sequelize from './config/database.js';

// Importing models (just for clarity, even though it's not explicitly required for global sync)
import './models/models.js';
import './models/review.js';
import './models/user.js';

import Movie from './models/models.js';
import { Review } from './models/review.js';
import User from './models/user.js';

const app = express();

// Use CORS middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Sync the models in order of creation
User.sync().then(() => {
    Movie.sync().then(() => {
        Review.sync().then(() => {
            console.log("All tables created!");
        });
    });
  });



// API Routes
app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);

// Serve React App
app.use(express.static("../build"));
app.get("*", (req, res) => {
  res.sendFile("index.html", { root: "../build" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
