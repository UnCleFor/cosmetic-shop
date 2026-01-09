import UserService from "../services/user.service.js";

class UsersController {

    // Tạo user
    static async createUser(req, res) {
        try {
            const {
                name,
                email,
                password,
                confirmPassword,
                isAdmin,
                phone,
                avatar
            } = req.body;

            // Kiểm tra bắt buộc
            if (!name || !email || !password || !confirmPassword || !phone) {
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
            const userResponse = {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                avatar: user.avatar,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };
            res.status(201).json({
                message: "Đăng ký thành công",
                user: userResponse,
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

    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            // Gọi service để xử lý đăng nhập
            const result = await UserService.loginUser({ email, password });

            const { refreshToken, ...response } = result

            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: true,
            })

            res.status(200).json({
                success: true,
                message: "Đăng nhập thành công",
                data: response
            });

        } catch (error) {
            // Xử lý lỗi
            res.status(400).json({
                success: false,
                message: error.message
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

    static async getDetail(req, res) {
        try {
            const { id } = req.params;
            // Validate ID
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "ID user là bắt buộc"
                });
            }

            const user = await UserService.getDetail(id);

            res.status(200).json({
                success: true,
                message: "Lấy thông tin user thành công",
                data: user
            });

        } catch (error) {
            if (error.message.includes("Không tìm thấy")) {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Cập nhật thông tin user (cho admin)
    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            // Gọi service để cập nhật user
            const updatedUser = await UserService.updateUser(id, updateData);

            res.status(200).json({
                success: true,
                message: "Cập nhật user thành công",
                data: updatedUser
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Xóa user (admin only)
    static async deleteUser(req, res) {
        try {
            const { id } = req.params;

            const result = await UserService.deleteUser(id);

            res.status(200).json({
                success: true,
                message: result.message
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async refreshToken(req, res) {
        try {
            const refreshToken = req.cookies?.refresh_token;

            // Validate
            if (!refreshToken) {
                return res.status(400).json({
                    message: "Refresh token không được để trống",
                });
            }

            // Gọi service
            const result = await UserService.refreshToken(refreshToken);

            res.cookie("access_token", result.accessToken, {
                httpOnly: true,
                secure: true,
            });

            // Response
            return res.status(200).json({
                message: "Refresh token thành công",
                data: {
                    user: result.user,
                    accessToken: result.accessToken,
                },
            });
        } catch (error) {
            return res.status(401).json({
                message: error.message || "Refresh token thất bại",
            });
        }
    }
}

export default UsersController;