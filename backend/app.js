// app.js

const express = require("express");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const movieRoutes = require("./routes/movieRoutes"); // Ensure the path is correct
const app = express();

app.use(express.json());

// API Routes
app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);

// Serve React App
app.use(express.static("../build")); // The path to the build folder is relative to app.js
app.get("*", (req, res) => {
  res.sendFile("index.html", { root: "../build" }); // The path to the build folder is relative to app.js
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
