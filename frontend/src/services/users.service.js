import axiosClient from "../utils/axiosClient";

const UsersService = {
    // Đăng ký
    signup(data) {
        return axiosClient.post("/users/register", data);
    },

    // Đăng nhập
    login(data) {
        return axiosClient.post("/users/login", data);
    },

    // Lấy thông tin user hiện tại
    getProfile() {
        return axiosClient.get("/users/me");
    },

    // Cập nhật profile
    updateProfile(data) {
        return axiosClient.put("/users/me", data);
    },

    // Lấy danh sách users
    getUsers(params = {}) {
        return axiosClient.get("/users", { params });
    },

    // Lấy user theo ID
    getUserById(id) {
        return axiosClient.get(`/users/${id}`);
    },

    // Cập nhật user (admin)
    updateUser(id, data) {
        return axiosClient.put(`/users/${id}`, data);
    },

    // Xóa user
    deleteUser(id) {
        return axiosClient.delete(`/users/${id}`);
    },
};

export default UsersService;
