import express from 'express';
import userController from '../controller/userController';
import authMiddleware from '../middleware/authMiddleware';
import validateRequest from '../middleware/validateRequest';

import { registerUserSchema, loginUserSchema } from '../middleware/validators/userSchemas';

const router = express.Router();

// Register a new user
router.post('/register', validateRequest(registerUserSchema), userController.registerUser);

// Login a user
router.post('/login', validateRequest(loginUserSchema), userController.loginUser);

// Get a user's profile
router.get('/profile/:id', authMiddleware, userController.getUserProfile);

// Follow another user
router.post('/:id/follow', authMiddleware, userController.followUser);

// Unfollow another user
router.post('/:id/unfollow', authMiddleware, userController.unfollowUser);

export default router;