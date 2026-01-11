import jwt from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config()

class JwtService {
    // Tạo access token
    static generateAccessToken(payload, expiresIn = '24h') {
        return jwt.sign(
            payload,
            process.env.ACCESS_TOKEN,
            { expiresIn }
        );
    }

    // Tạo refresh token
    static generateRefreshToken(payload, expiresIn = '7d') {
        return jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
            { expiresIn }
        );
    }

    // Xác thực access token
    static verifyAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        } catch (error) {
            throw new Error('Token không hợp lệ hoặc đã hết hạn');
        }
    }

    // Xác thực refresh token
    static verifyRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key');
        } catch (error) {
            throw new Error('Refresh token không hợp lệ');
        }
    }

    // Giải mã token (không verify)
    static decodeToken(token) {
        return jwt.decode(token);
    }

    // Tạo cả access token và refresh token
    static generateTokens(user) {
        const payload = {
            userId: user._id,
            email: user.email,
            role: user.role
        };

        const accessToken = this.generateAccessToken(payload, '24h');
        const refreshToken = this.generateRefreshToken(payload, '7d');

        return {
            accessToken,
            refreshToken
        };
    }

    // Refresh token mới
    static refreshToken(oldRefreshToken) {
        try {
            const decoded = this.verifyRefreshToken(oldRefreshToken);
            
            const newAccessToken = this.generateAccessToken({
                userId: decoded.userId,
                email: decoded.email,
                role: decoded.role
            }, '15m');

            return {
                accessToken: newAccessToken,
                user: {
                    userId: decoded.userId,
                    email: decoded.email,
                    role: decoded.role
                }
            };
        } catch (error) {
            throw new Error('Không thể refresh token');
        }
    }
}

export default JwtService;