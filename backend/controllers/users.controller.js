import UsersDAO from "../dao/usersDAO.js";

export default class UserController {
    // Tạo người dùng mới
    static async createUser(req, res) {
        try {
            const {
                name,
                email,
                password,
                admin,
                phone,
                avatar,
                address
            } = req.body;

            const newUser = await UsersDAO.createUser({
                name,
                email,
                password,
                admin: admin ?? false,
                phone,
                avatar,
                address,
            });

            // Không trả password
            newUser.password = undefined;

            return res.status(201).json({
                message: "Tạo người dùng thành công",
                user: newUser,
            });

        } catch (err) {
            if (err.code === 11000) {
                return res.status(400).json({
                    error: "Email đã tồn tại"
                });
            }

            console.error(err);
            return res.status(500).json({
                error: "Lỗi server"
            });
        }
    }

    // Lấy danh sách user (hỗ trợ filter)
    static async getUsers(req, res) {
        try {
            const filters = {
                email: req.query.email,
                name: req.query.name,
                admin: req.query.admin,
            };

            const {
                usersList,
                count
            } = await UsersDAO.getUsers(filters);

            let response = {
                users: usersList,
                total_results: count,
            };

            return res.status(200).json(response);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: "Lỗi server"
            });
        }
    }
}