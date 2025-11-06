import express from 'express';
import UserController from '../controllers/users.controller.js';

const router = express.Router();

router.route('/').get(UserController.getUsers);

export default router;