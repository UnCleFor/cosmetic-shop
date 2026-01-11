import { useMutation, useQueryClient } from "@tanstack/react-query";
import OrdersService from "../../services/orders.service";
import { message } from "antd";

const useUpdate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orderId, data }) =>
            OrdersService.updateOrder(orderId, data),

        onSuccess: () => {
            message.success("Cập nhật đơn hàng thành công");
            queryClient.invalidateQueries(["orders"]);
        },
    });
};

export default useUpdate;
