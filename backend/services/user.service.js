import User from "../models/user.model.js";

class UserService {
    // Tạo người dùng
    static async createUser(data) {
        const user = await User.create(data);
        return user;
    }

    // Lấy danh sách người dùng (có thể thêm filter sau)
    static async getUsers() {
        const users = await User.find().select("-password");
        return users;
    }

    // Tìm user theo email
    static async findByEmail(email) {
        return await User.findOne({ email });
    }
}

export default UserService;
