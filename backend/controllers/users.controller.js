import UserService from "../services/user.service.js";

class UsersController {

    // Tạo user
    static async createUser(req, res) {
        try {
            const {
                name,
                email,
                password,
                isAdmin,
                phone,
                avatar
            } = req.body;

            const user = await UserService.createUser({
                name,
                email,
                password,
                role: isAdmin ? "admin" : "user",
                phone,
                avatar
            });

            res.status(201).json({
                message: "User created successfully",
                user,
            });
        } catch (err) {
            res.status(400).json({
                message: "Cannot create user",
                error: err.message,
            });
        }
    }

    // Lấy tất cả user
    static async getUsers(req, res) {
        try {
            const users = await UserService.getUsers();

            res.status(200).json({
                count: users.length,
                users,
            });
        } catch (err) {
            res.status(500).json({
                message: "Cannot fetch users",
                error: err.message,
            });
        }
    }
}

export default UsersController;