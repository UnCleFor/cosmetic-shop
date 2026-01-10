import Cosmetic from "../models/cosmetic.model.js";

class CosmeticService {

    // Tạo mỹ phẩm
    static async createCosmetic(data) {
        const cosmetic = await Cosmetic.create(data);
        return cosmetic;
    }

    // Lấy danh sách mỹ phẩm với filter đơn giản
    static async getCosmetics({ filters = {}, page = 1, limit = 8, sort = {} }) {
        const query = {};

        // Filter
        if (filters.name) {
            query.name = { $regex: filters.name, $options: "i" };
        }
        if (filters.brand) {
            query.brand = filters.brand;
        }
        if (filters.category) {
            query.category = filters.category;
        }
        if (filters.status) {
            query.status = filters.status;
        }

        // Pagination
        const skip = (page - 1) * limit;

        // Sort 
        const allowedSortFields = ["price", "createdAt", "name", "discount", "sold"]; 
        const sortField = allowedSortFields.includes(sort.sortBy)
            ? sort.sortBy
            : "createdAt";

        const sortOrder = sort.order === "asc" ? 1 : -1;

        const sortOption = {
            [sortField]: sortOrder
        };

        const [cosmetics, total] = await Promise.all([
            Cosmetic.find(query)
                .sort(sortOption)
                .skip(skip)
                .limit(limit),
            Cosmetic.countDocuments(query)
        ]);

        return {
            total,
            page,
            limit,
            cosmetics
        };
    }

    // Lấy mỹ phẩm theo ID
    static async getCosmeticById(id) {
        return await Cosmetic.findById(id);
    }

    // Cập nhật mỹ phẩm
    static async updateCosmetic(id, data) {
        return await Cosmetic.findByIdAndUpdate(
            id,
            data, {
            new: true,
            runValidators: true
        }
        );
    }

    // Xóa mỹ phẩm
    static async deleteCosmetic(id) {
        return await Cosmetic.findByIdAndDelete(id);
    }
}

export default CosmeticService;