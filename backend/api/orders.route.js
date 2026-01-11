import express from 'express';
import OrdersController from '../controllers/orders.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/my')
    .get(authMiddleware.requireAuth, OrdersController.getMyOrders)
router
    .route('/:id')
    .get(authMiddleware.requireAuth, OrdersController.getOrderById)
    .put(authMiddleware.requireAuth, OrdersController.updateOrder)
    .delete(authMiddleware.requireAdmin, OrdersController.deleteOrder);
router
    .route('/')
    .get(authMiddleware.requireAdmin, OrdersController.getOrders)
    .post(OrdersController.createOrder);
export default router;