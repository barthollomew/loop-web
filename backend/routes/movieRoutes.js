// movieRoutes.js

import express from 'express';
import { getMovies } from '../controllers/movieController.js';  // Import the controller

const router = express.Router();

router.get('/', getMovies);  // Use the controller function

export default router;
