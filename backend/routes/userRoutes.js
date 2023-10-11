// userRoutes.js

import express from 'express';
import { signIn, signUp, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
router.delete('/delete/:username', deleteUser);


export default router;
