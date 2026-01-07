import express from 'express';
import CosmeticsController from '../controllers/cosmetics.controller.js';

const router = express.Router();

//demo thử
router
    .route('/')
    .get(CosmeticsController.getCosmetics)
    .post(CosmeticsController.createCosmetic);
router
    .route('/:id')
    .get(CosmeticsController.getCosmeticById)
    .put(CosmeticsController.updateCosmetic)
    .delete(CosmeticsController.deleteCosmetic);
export default router;