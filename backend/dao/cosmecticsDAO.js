let cosmetics

export default class CosmeticsDAO {
    static async injectDB(conn) {
        if (cosmetics) {
            return;
        }
        try {
            cosmetics = await conn.db(process.env.COSMETIC_DB_NAME).collection("cosmetics");
        } catch (e) {
            console.error(`Unable to establish a collection handle in cosmeticDAO: ${e}`);
        }
    }

    static async getCosmetics({
        filters = null,
        page = 0,
        cosmeticsPerPage = 20,
        sort = null,
    } = {}) {
        let query = {};

        // ✅ Build query filters
        if (filters) {
            if (filters.name) {
                query.name = {
                    $regex: filters.name,
                    $options: "i"
                };
            }
            if (filters.brand) {
                query.brand = filters.brand;
            }
            if (filters.category) {
                query.category = filters.category;
            }
            if (filters.minPrice || filters.maxPrice) {
                query.price = {};
                if (filters.minPrice) query.price.$gte = Number(filters.minPrice);
                if (filters.maxPrice) query.price.$lte = Number(filters.maxPrice);
            }
        }

        // ✅ Sorting
        let sortQuery = {};
        if (sort === "price-asc") sortQuery.price = 1;
        if (sort === "price-desc") sortQuery.price = -1;
        if (sort === "name-asc") sortQuery.name = 1;

        try {
            const cursor = cosmetics
                .find(query)
                .sort(sortQuery)
                .skip(page * cosmeticsPerPage)
                .limit(cosmeticsPerPage);

            const cosmeticsList = await cursor.toArray();
            const totalNumCosmetics = await cosmetics.countDocuments(query);

            return {
                cosmeticsList,
                totalNumCosmetics,
            };

        } catch (e) {
            console.error(`Unable to issue find command: ${e}`);
            return {
                cosmeticsList: [],
                totalNumCosmetics: 0,
            };
        }
    }
}