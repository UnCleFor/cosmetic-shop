import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = {
    requireAdmin: async (req, res, next) => {
        try {
            const token = req.headers.token?.split(' ')[1];
            
            if (!token) {
                return res.status(401).json({ message: 'Token là bắt buộc' });
            }

            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
            const user = await User.findById(decoded.userId);
            
            if (!user || user.role !== 'admin') {
                return res.status(403).json({ message: 'Yêu cầu quyền admin' });
            }

            req.user = user;
            next();

        } catch (error) {
            return res.status(401).json({ message: 'Token không hợp lệ' });
        }
    }
};

export default authMiddleware;