import Cosmetic from "../models/cosmetic.model.js";

class CosmeticService {

    // Tạo mỹ phẩm
    static async createCosmetic(data) {
        const cosmetic = await Cosmetic.create(data);
        return cosmetic;
    }

    // Lấy danh sách mỹ phẩm với filter đơn giản
    static async getCosmetics(filters = {}) {
        const query = {};

        if (filters.name) {
            query.name = { $regex: filters.name, $options: "i" };
        }
        if (filters.brand) {
            query.brand = filters.brand;
        }
        if (filters.category) {
            query.category = filters.category;
        }

        const cosmetics = await Cosmetic.find(query);
        return cosmetics;
    }
}

export default CosmeticService;