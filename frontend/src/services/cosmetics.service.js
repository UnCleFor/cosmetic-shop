import axiosClient from "../utils/axiosClient";

const CosmeticsService = {

    // Tạo mỹ phẩm
    createCosmetic(data) {
        return axiosClient.post("/cosmetics", data);
    },

    // Lấy danh sách mỹ phẩm (filter + pagination + sort)
    getCosmetics(params = {}) {
        return axiosClient.get("/cosmetics", {
            params,
        });
    },

    // Lấy mỹ phẩm theo ID
    getCosmeticById(id) {
        return axiosClient.get(`/cosmetics/${id}`);
    },

    // Cập nhật mỹ phẩm
    updateCosmetic(id, data) {
        return axiosClient.put(`/cosmetics/${id}`, data);
    },

    // Xóa mỹ phẩm
    deleteCosmetic(id) {
        return axiosClient.delete(`/cosmetics/${id}`);
    },
};

export default CosmeticsService;
