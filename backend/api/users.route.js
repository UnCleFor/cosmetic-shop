import express from 'express';
import UserController from '../controllers/users.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/register')
    .post(UserController.createUser);
router
    .route('/login')
    .post(UserController.loginUser);
router
    .route('/refresh-token')
    .post(UserController.refreshToken);
router
    .route('/:id')
    .get(authMiddleware.requireAdmin, UserController.getDetail)
    .delete(authMiddleware.requireAdmin, UserController.deleteUser)
    .put(authMiddleware.requireAuth, UserController.updateUser);
router
    .route('/')
    .get(authMiddleware.requireAdmin, UserController.getUsers)

export default router;