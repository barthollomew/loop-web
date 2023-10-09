import express from 'express';
import userRoutes from './routes/userRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import sequelize from './config/database.js';

// Importing models (just for clarity, even though it's not explicitly required for global sync)
import './models/models.js';
import './models/review.js';
import './models/user.js';

const app = express();

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

// Reset the database and sync models globally
sequelize.sync({ force: true })
  .then(() => {
    console.log('Database reset and synced');
    // Start your server here
  })
  .catch(err => {
    console.error('Error syncing database:', err);
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
