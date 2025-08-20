let cosmetics

export default class CosmeticDAO {
    static async injectDB(conn) {
        if (this.cosmetics) {
            return;
        }
        try {
            this.cosmetics = await conn.db(process.env.COSMETIC_DB_NAME).collection("cosmetics");
        } catch (e) {
            console.error(`Unable to establish a collection handle in cosmeticDAO: ${e}`);
        }
    }

    static async getCosmetics({
        filters = null,
        page = 0,
        cosmeticsPerPage = 20,
        } = {}) {
            let query;
            if (filters) {
                if ("name" in filters) {
                    query = { name: { $regex: filters["name"], $options: "i" } };
                }
            }
    }
}