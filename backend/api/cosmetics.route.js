import express from 'express';
import CosmeticsController from '../controllers/cosmetics.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router
    .route('/')
    .get(CosmeticsController.getCosmetics)
    .post(CosmeticsController.createCosmetic);
router
    .route('/:id')
    .get(CosmeticsController.getCosmeticById)
    .put(authMiddleware.requireAdmin, CosmeticsController.updateCosmetic)
    .delete(authMiddleware.requireAdmin, CosmeticsController.deleteCosmetic);
export default router;