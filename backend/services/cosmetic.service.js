import Cosmetic from "../models/cosmetic.model.js";

class CosmeticService {

    // Tạo mỹ phẩm
    static async createCosmetic(data) {
        const cosmetic = await Cosmetic.create(data);
        return cosmetic;
    }

    static async getCosmetics({ filters = {}, page = 1, limit = 8, sort = {} }) {
        const matchStage = {};

        // Search
        if (filters.search) {
            matchStage.$or = [
                { name: { $regex: filters.search, $options: "i" } },
            ];
        }

        // Filter
        if (filters.brand) matchStage.brand = filters.brand;
        if (filters.category) matchStage.category = filters.category;
        if (filters.status) matchStage.status = filters.status;

        // Pagination
        const skip = (page - 1) * limit;

        // Sort
        const allowedSortFields = [
            "price",
            "createdAt",
            "name",
            "discount",
            "sold",
            "finalPrice",
        ];

        const sortField = allowedSortFields.includes(sort.sortBy)
            ? sort.sortBy
            : "createdAt";

        const sortOrder = sort.order === "asc" ? 1 : -1;

        const pipeline = [
            { $match: matchStage },

            // Giá sau giảm
            {
                $addFields: {
                    finalPrice: {
                        $cond: [
                            { $gt: ["$discount", 0] },
                            {
                                $subtract: [
                                    "$price",
                                    {
                                        $multiply: [
                                            "$price",
                                            { $divide: ["$discount", 100] },
                                        ],
                                    },
                                ],
                            },
                            "$price",
                        ],
                    },
                },
            },

            {
                $sort: {
                    [sortField === "price" ? "finalPrice" : sortField]: sortOrder,
                },
            },

            { $skip: skip },
            { $limit: limit },
        ];

        const [cosmetics, total] = await Promise.all([
            Cosmetic.aggregate(pipeline),
            Cosmetic.countDocuments(matchStage),
        ]);

        return {
            total,
            page,
            limit,
            cosmetics,
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