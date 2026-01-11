import OrderService from "../services/order.service.js";

class OrdersController {
    // Tạo đơn hàng
    static async createOrder(req, res) {
        try {
            const order = await OrderService.createOrder({
                ...req.body,
                user: req.user._id, // lấy từ middleware auth
            });

            res.status(201).json({
                success: true,
                message: "Tạo đơn hàng thành công",
                data: order,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Lấy toàn bộ đơn hàng
    static async getOrders(req, res) {
        try {
            const { page = 1, limit = 8, status, user } = req.query;

            const result = await OrderService.getOrders({
                page: Number(page),
                limit: Number(limit),
                filters: { status, user },
            });

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }

    // Lấy đơn hàng bằng id
    static async getOrderById(req, res) {
        try {
            const order = await OrderService.getOrderById(req.params.id);

            res.status(200).json({
                success: true,
                data: order,
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Cập nhật đơn hàng
    static async updateOrder(req, res) {
        try {
            const { status } = req.body;

            const order = await OrderService.updateOrder(
                req.params.id,
                req.user,
                { status }
            );

            res.status(200).json({
                success: true,
                data: order,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }


    // Xóa đơn hàng
    static async deleteOrder(req, res) {
        try {
            await OrderService.deleteOrder(req.params.id);

            res.status(200).json({
                success: true,
                message: "Xóa đơn hàng thành công",
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Lấy đơn hàng của user đăng nhập
    static async getMyOrders(req, res) {
        try {
            const userId = req.user._id;

            const orders = await OrderService.getOrdersByUser(userId);

            res.status(200).json({
                success: true,
                data: orders,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

}

export default OrdersController;
