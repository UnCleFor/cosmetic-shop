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

            // Kiểm tra bắt buộc
            if (!name || !email || !password || !confirmPassword) {
                return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin bắt buộc" });
            }

            // Xác nhận mật khẩu
            if (password !== confirmPassword) {
                return res.status(400).json({ message: "Mật khẩu xác nhận không trùng khớp" });
            }

            // Kiểm tra độ mạnh mật khẩu
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+=-]{6,}$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).json({
                    message: "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số",
                });
            }

            // Kiểm tra định dạng số điện thoại
            if (phone && !/^(0|\+84)[0-9]{9}$/.test(phone)) {
                return res.status(400).json({
                    message: "Số điện thoại không hợp lệ",
                });
            }

            // Kiểm tra email đã tồn tại
            const existingUser = await UserService.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({
                    message: "Email đã được sử dụng",
                });
            }


            const user = await UserService.createUser({
                name,
                email,
                password,
                role: isAdmin ? "admin" : "user",
                phone,
                avatar
            });

            // Ẩn password khi trả về
            user.password = undefined;

            res.status(201).json({
                message: "Tạo người dùng thành công",
                user,
            });
        } catch (err) {
            if (err.code === 11000) {
                return res.status(400).json({
                    message: "Email đã tồn tại trong hệ thống",
                });
            }
            res.status(400).json({
                message: "Không thể tạo người dùng",
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
                message: "Không thể lấy danh sách người dùng",
                error: err.message,
            });
        }
    }
}

export default UsersController;