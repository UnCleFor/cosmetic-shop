import axiosClient from "../utils/axiosClient";

const OrdersService = {

    // USER: tạo đơn hàng
    createOrder(data) {
        return axiosClient.post("/orders", data);
    },
    
    // USER: lấy đơn hàng của chính mình
    getMyOrders() {
        return axiosClient.get("/orders/my");
    },

    // USER + ADMIN: cập nhật đơn hàng (status)
    updateOrder(orderId, data) {
        return axiosClient.put(`/orders/${orderId}`, data);
    },

    // ADMIN: hard delete
    deleteOrder(orderId) {
        return axiosClient.delete(`/orders/${orderId}`);
    },

    // ADMIN: lấy tất cả đơn hàng
    getAllOrders(params) {
        return axiosClient.get("/orders", { params });
    },

    // ADMIN: lấy chi tiết đơn
    getOrderById(orderId) {
        return axiosClient.get(`/orders/${orderId}`);
    }
};

export default OrdersService;
