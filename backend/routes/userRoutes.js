// userRoutes.js

import express from 'express';
import { signIn, signUp, deleteUser } from '../controllers/userController.js';
import { checkAuth, logout } from '../controllers/userController';

const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
router.delete('/delete/:username', deleteUser);
router.get('/auth', checkAuth);
router.get('/logout', logout);


export default router;
