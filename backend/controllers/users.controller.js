import UserService from "../services/user.service.js";
import JwtService from "../services/jwt.service.js";
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
                message: "Tạo người dùng thành công",
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

            // Trả về kết quả thành công
            res.status(200).json({
                success: true,
                message: "Đăng nhập thành công",
                data: result
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
            const currentUser = req.user; // Lấy từ middleware requireUser

            // Validate ID
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "ID user là bắt buộc"
                });
            }

            // Kiểm tra quyền truy cập
            // Admin có thể xem mọi user, user chỉ xem được chính mình
            if (currentUser.role !== 'admin' && currentUser._id.toString() !== id) {
                return res.status(403).json({
                    success: false,
                    message: "Bạn chỉ có quyền xem thông tin của chính mình"
                });
            }

            const user = await UserService.getDetail(id);

            res.status(200).json({
                success: true,
                message: "Lấy thông tin user thành công",
                data: user
            });

        } catch (error) {
            console.error(`💥 Get detail error: ${error.message}`);

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

    static async generateAccessToken(req, res) {
        try {
            console.log('🔄 Refresh token request received');

            // Lấy refresh token từ headers (giống cách bạn đang dùng)
            const refreshToken = req.headers.token?.split(' ')[1]

            console.log('📨 Refresh token from headers:', refreshToken ? '✓ Present' : '✗ Missing');

            // Kiểm tra refresh token có được cung cấp không
            if (!refreshToken) {
                return res.status(400).json({
                    success: false,
                    message: "Refresh token là bắt buộc. Gửi trong header: Authorization: Bearer <refreshToken>"
                });
            }

            // Gọi JwtService để tạo access token mới
            const result = JwtService.refreshToken(refreshToken);

            console.log('✅ New access token generated for user:', result.user.email);

            res.status(200).json({
                success: true,
                message: "Tạo access token mới thành công",
                data: {
                    accessToken: result.accessToken,
                    user: result.user
                }
            });

        } catch (error) {
            console.error('❌ Generate access token error:', error.message);

            // Xử lý các loại lỗi cụ thể
            if (error.message.includes('Refresh token không hợp lệ') ||
                error.message.includes('Không thể refresh token')) {
                return res.status(401).json({
                    success: false,
                    message: "Refresh token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại."
                });
            }

            res.status(500).json({
                success: false,
                message: "Lỗi server khi tạo token mới: " + error.message
            });
        }
    }
}
export default UsersController;