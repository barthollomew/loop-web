// movieRoutes.js

const express = require('express');
const { getMovies } = require('../controllers/movieController');  // Import the controller
const router = express.Router();

router.get('/', getMovies);  // Use the controller function

module.exports = router;
