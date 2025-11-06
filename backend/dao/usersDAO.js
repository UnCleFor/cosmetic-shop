import User from "../models/users.model.js";

export default class UsersDAO {
    // Tạo user mới
    static async createUser(data) {
        try {
            const newUser = new User(data);
            await newUser.save();
            return newUser;
        } catch (err) {
            console.error("Error creating user:", err);
            throw err;
        }
    }

    // Lấy danh sách user (có filter)
    static async getUsers(filters = {}) {
        try {
            const query = {};

            if (filters.email) query.email = filters.email;
            if (filters.name) query.name = new RegExp(filters.name, "i");
            if (filters.admin === "true") query.admin = true;
            if (filters.admin === "false") query.admin = false;

            const users = await User.find(query).select("+password");
            const count = await User.countDocuments(query);

            return { users, count };
        } catch (err) {
            console.error("Error fetching users:", err);
            throw err;
        }
    }

    // Hàm dùng cho login
    static async getUserByEmail(email) {
        try {
            return await User.findOne({ email }).select("+password");
        } catch (err) {
            console.error("Error fetching user by email:", err);
            throw err;
        }
    }
}
