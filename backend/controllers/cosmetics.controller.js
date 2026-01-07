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
            const {
                page = 1,
                limit = 10,
                sortBy = "name",
                order = "asc",
                ...filters
            } = req.query;

            const result = await CosmeticService.getCosmetics({
                filters,
                page: Number(page),
                limit: Number(limit),
                sort: {
                    sortBy,
                    order
                }
            });

            res.status(200).json({
                total: result.total,
                page: result.page,
                limit: result.limit,
                sortBy,
                order,
                cosmetics: result.cosmetics,
            });

        } catch (err) {
            res.status(500).json({
                message: "Cannot fetch cosmetics",
                error: err.message,
            });
        }
    }

    // Lấy chi tiết mỹ phẩm theo ID
    static async getCosmeticById(req, res) {
        try {
            const {
                id
            } = req.params;

            const cosmetic = await CosmeticService.getCosmeticById(id);

            if (!cosmetic) {
                return res.status(404).json({
                    message: "Cosmetic not found",
                });
            }

            res.status(200).json(cosmetic);
        } catch (err) {
            res.status(500).json({
                message: "Cannot fetch cosmetic",
                error: err.message,
            });
        }
    }

    // Cập nhật mỹ phẩm
    static async updateCosmetic(req, res) {
        try {
            const {
                id
            } = req.params;

            const updatedCosmetic = await CosmeticService.updateCosmetic(id, req.body);

            if (!updatedCosmetic) {
                return res.status(404).json({
                    message: "Cosmetic not found",
                });
            }

            res.status(200).json({
                message: "Cosmetic updated successfully",
                cosmetic: updatedCosmetic,
            });
        } catch (err) {
            res.status(400).json({
                message: "Cannot update cosmetic",
                error: err.message,
            });
        }
    }

    // Xóa mỹ phẩm
    static async deleteCosmetic(req, res) {
        try {
            const {
                id
            } = req.params;

            const deletedCosmetic = await CosmeticService.deleteCosmetic(id);

            if (!deletedCosmetic) {
                return res.status(404).json({
                    message: "Cosmetic not found",
                });
            }

            res.status(200).json({
                message: "Cosmetic deleted successfully",
            });
        } catch (err) {
            res.status(500).json({
                message: "Cannot delete cosmetic",
                error: err.message,
            });
        }
    }
}

export default CosmeticsController;