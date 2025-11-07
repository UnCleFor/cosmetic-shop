import CosmeticService from "../services/cosmetic.service.js";

class CosmeticsController {

    // Tạo mỹ phẩm
    static async createCosmetic(req, res) {
        try {
            const cosmetic = await CosmeticService.createCosmetic(req.body);

            res.status(201).json({
                message: "Cosmetic created successfully",
                cosmetic,
            });

        } catch (err) {
            res.status(400).json({
                message: "Cannot create cosmetic",
                error: err.message,
            });
        }
    }

    // Lấy danh sách mỹ phẩm
    static async getCosmetics(req, res) {
        try {
            const filters = req.query;

            const cosmetics = await CosmeticService.getCosmetics(filters);

            res.status(200).json({
                count: cosmetics.length,
                cosmetics,
            });

        } catch (err) {
            res.status(500).json({
                message: "Cannot fetch cosmetics",
                error: err.message,
            });
        }
    }
}

export default CosmeticsController;