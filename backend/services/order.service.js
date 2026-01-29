import mongoose from "mongoose";
import Order from "../models/order.model.js";
import Cosmetic from "../models/cosmetic.model.js";

class OrderService {
    // Tạo đơn hàng
    static async createOrder(data) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const {
                items
            } = data;

            // Check stock
            for (const item of items) {
                const product = await Cosmetic
                    .findById(item.product)
                    .session(session);

                if (!product) {
                    throw new Error("Sản phẩm không tồn tại");
                }

                if (product.stock < item.quantity) {
                    throw new Error(
                        `Sản phẩm "${product.name}" không đủ số lượng`
                    );
                }
            }

            // Trừ stock
            for (const item of items) {
                await Cosmetic.findByIdAndUpdate(
                    item.product, {
                        $inc: {
                            stock: -item.quantity,
                            sold: item.quantity
                        }
                    }, {
                        session
                    }
                );
            }

            // Tạo đơn hàng
            const order = new Order(data);
            await order.save({
                session
            });

            await session.commitTransaction();
            session.endSession();

            return order;

        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }

    // Lấy toàn bộ đơn hàng (cho admin)
    static async getOrders({
        page = 1,
        limit = 10,
        filters = {}
    }) {
        const skip = (page - 1) * limit;

        const query = {};
        if (filters.status) query.status = filters.status;
        if (filters.user) query.user = filters.user;

        const [orders, total] = await Promise.all([
            Order.find(query)
            // .populate("user", "name email")
            // .populate("items.product", "name price")
            .sort({
                createdAt: -1
            })
            .skip(skip)
            .limit(limit),
            Order.countDocuments(query),
        ]);

        return {
            orders,
            total,
            page,
            limit
        };
    }

    // Lấy đơn hàng bằng id
    static async getOrderById(id) {
        const order = await Order.findById(id)
        if (!order) throw new Error("Không tìm thấy đơn hàng");
        return order;
    }

    // Cập nhật đơn hàng
    static async updateOrder(id, user, updateData) {
        const order = await Order.findById(id);
        if (!order) throw new Error("Không tìm thấy đơn hàng");

        // USER
        if (user.role === "user") {
            if (!order.user.equals(user._id)) {
                throw new Error("Không có quyền");
            }

            const allowedStatus = ["cancelled", "deleted"];

            if (!allowedStatus.includes(updateData.status)) {
                throw new Error("Không được phép cập nhật trạng thái này");
            }

            // chỉ cho hủy khi confirming
            if (
                updateData.status === "cancelled" &&
                order.status !== "confirming"
            ) {
                throw new Error("Không thể hủy đơn");
            }

            order.status = updateData.status;
        }

        // ADMIN
        if (user.role === "admin") {
            Object.assign(order, updateData);
        }

        return order.save();
    }


    // Xóa đơn hàng
    static async deleteOrder(id) {
        const order = await Order.findByIdAndDelete(id);
        if (!order) throw new Error("Xóa đơn hàng thất bại");
        return order;
    }

    // Lấy đơn hàng của 1 user
    static async getOrdersByUser(userId) {
        return Order.find({
                user: userId
            })
            .sort({
                createdAt: -1
            });
    }
}

export default OrderService;