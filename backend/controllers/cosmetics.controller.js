import CosmeticsDAO from "../dao/cosmecticsDAO.js";

export default class CosmeticsController {

    static async apiGetCosmetics(req, res, next) {
        const cosmeticsPerPage = req.query.limit ? Number(req.query.limit) : 20;
        const page = req.query.page ? Number(req.query.page) - 1 : 0;

        const filters = {};
        if (req.query.name) filters.name = req.query.name;
        if (req.query.brand) filters.brand = req.query.brand;
        if (req.query.category) filters.category = req.query.category;
        if (req.query.minPrice) filters.minPrice = req.query.minPrice;
        if (req.query.maxPrice) filters.maxPrice = req.query.maxPrice;

        const sort = req.query.sort || null;

        const {
            cosmeticsList,
            totalNumCosmetics
        } =
        await CosmeticsDAO.getCosmetics({
            filters,
            page,
            cosmeticsPerPage,
            sort
        });

        let response = {
            cosmetics: cosmeticsList,
            page: page + 1,
            filters: filters,
            entries_per_page: cosmeticsPerPage,
            total_results: totalNumCosmetics,
        };

        res.json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Lỗi server"
        });
    }
}