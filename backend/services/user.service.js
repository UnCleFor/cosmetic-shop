import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import JwtService from "./jwt.service.js";

class UserService {
    static async createUser(data) {
        try {
            // Mã hóa password trước khi lưu
            if (data.password) {
                const saltRounds = 10;
                data.password = await bcrypt.hash(data.password, saltRounds);
            }

            const user = await User.create(data);
            return user;
        } catch (error) {
            throw new Error(`Lỗi tạo user: ${error.message}`);
        }
    }

    // Lấy danh sách người dùng (có thể thêm filter sau)
    static async getUsers() {
        const users = await User.find().select("-password");
        return users;
    }

    // Lấy thông tin 1 người dùng
    static async getDetail(userId) {
        try {
            // Kiểm tra user có tồn tại không
            const user = await User.findById(userId).select('-password');
            if (!user) {
                throw new Error("Không tìm thấy user");
            }
            return user;
        } catch (error) {
            throw new Error(`Lỗi lấy thông tin user: ${error.message}`);
        }
    }

    // Tìm user theo email
    static async findByEmail(email) {
        try {
            return await User.findOne({ email }).select('+password');
        } catch (error) {
            throw new Error(`Lỗi tìm user: ${error.message}`);
        }
    }

    // Login
    static async loginUser(data) {
        const { email, password } = data;

        // Kiểm tra xem email và password có được cung cấp
        if (!email || !password) {
            throw new Error("Email và password là bắt buộc");
        }

        // Tìm user theo email - LẤY CẢ PASSWORD
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new Error("Email hoặc password không đúng");
        }

        // So sánh password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Email hoặc password không đúng");
        }

        // Tạo tokens sử dụng JwtService
        const tokens = JwtService.generateTokens(user);

        // Trả về thông tin user (không bao gồm password) và tokens
        const userWithoutPassword = {
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            phone: user.phone,
            avatar: user.avatar,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        return {
            user: userWithoutPassword,
            ...tokens
        };
    }

    // Refresh token
    static async refreshToken(refreshToken) {
        try {
            const result = JwtService.refreshToken(refreshToken);

            // Lấy thông tin user mới nhất
            const user = await this.findById(result.user.userId);

            return {
                user,
                accessToken: result.accessToken
            };
        } catch (error) {
            throw new Error(`Lỗi refresh token: ${error.message}`);
        }
    }

    // Xác thực token
    static async verifyToken(token) {
        try {
            const decoded = JwtService.verifyAccessToken(token);
            const user = await this.findById(decoded.userId);

            if (!user) {
                throw new Error('User không tồn tại');
            }

            return user;
        } catch (error) {
            throw new Error(`Lỗi xác thực token: ${error.message}`);
        }
    }

    // Cập nhật thông tin user
    static async updateUser(userId, updateData) {
        try {
            // Kiểm tra user có tồn tại không
            const existingUser = await User.findById(userId);
            if (!existingUser) {
                throw new Error("Không tìm thấy user");
            }

            // Nếu có email mới, kiểm tra email không trùng
            if (updateData.email && updateData.email !== existingUser.email) {
                const emailExists = await User.findOne({
                    email: updateData.email,
                    _id: { $ne: userId }
                });
                if (emailExists) {
                    throw new Error("Email đã được sử dụng bởi user khác");
                }
            }

            // Cập nhật user
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    $set: updateData
                },
                {
                    new: true, // Trả về document sau khi update
                    runValidators: true // Chạy validation
                }
            ).select("-password");

            if (!updatedUser) {
                throw new Error("Cập nhật user thất bại");
            }

            return updatedUser;
        } catch (error) {
            throw new Error(`Lỗi cập nhật user: ${error.message}`);
        }
    }

    // Xóa user
    static async deleteUser(userId) {
        try {
            const user = await User.findByIdAndDelete(userId);
            if (!user) {
                throw new Error("Không tìm thấy user để xóa");
            }

            return { message: "Xóa user thành công" };
        } catch (error) {
            throw new Error(`Lỗi xóa user: ${error.message}`);
        }
    }
}

export default UserService;
