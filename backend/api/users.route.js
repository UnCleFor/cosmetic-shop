import express from 'express';
import UserController from '../controllers/users.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/sign-up')
    .get(UserController.getUsers)
    .post(UserController.createUser);
router
    .route('/login')
    .post(UserController.loginUser);
router
    .route('/update-user/:id')
    .put(UserController.updateUser);
router
    .route('/delete-user/:id')
    .delete(authMiddleware.requireAdmin, UserController.deleteUser);
router
    .route('/getAll')
    .get(authMiddleware.requireAdmin, UserController.getUsers);
router
    .route('/get-detail/:id')
    .get(authMiddleware.requireUser, UserController.getDetail);
router
    .route('/refresh-token')
    .post(UserController.generateAccessToken);


export default router;