import express from 'express';
import UserController from '../controllers/users.controller.js';

const router = express.Router();

router
    .route('/')
    .get(UserController.getUsers)
    .post(UserController.createUser);
export default router;