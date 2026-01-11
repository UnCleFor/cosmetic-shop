import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import OrdersService from "../../services/orders.service";

const useCancel = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderId) =>
            OrdersService.updateOrder(orderId, { status: "cancelled" }),

        onSuccess: () => {
            message.success("Đã hủy đơn hàng");
            queryClient.invalidateQueries(["my-orders"]);
        },

        onError: (error) => {
            message.error(error.response?.data?.message || "Hủy đơn thất bại");
        }
    });
};

export default useCancel;
