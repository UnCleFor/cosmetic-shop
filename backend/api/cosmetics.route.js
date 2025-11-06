import express from 'express';
import CosmeticsController from '../controllers/cosmetics.controller.js';

const router = express.Router();

//demo thử
router.route('/').get((req, res) => {
    res.json({ message: "Hello from cosmetics route!" });
});
// router.get("/", (req, res) => {
//     res.json({ message: "Hello from cosmetics route!" });
// });

// // Lấy danh sách tất cả sản phẩm mỹ phẩm
// router.get('/', cosmeticsController.getAllCosmetics);

// // Lấy thông tin một sản phẩm mỹ phẩm theo ID
// router.get('/:id', cosmeticsController.getCosmeticById);

// // Thêm mới một sản phẩm mỹ phẩm
// router.post('/', cosmeticsController.createCosmetic);

// // Cập nhật thông tin một sản phẩm mỹ phẩm
// router.put('/:id', cosmeticsController.updateCosmetic);

// // Xóa một sản phẩm mỹ phẩm
// router.delete('/:id', cosmeticsController.deleteCosmetic);

export default router;