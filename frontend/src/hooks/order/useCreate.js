// hooks/order/useCreateOrder.js
import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import {
    message
} from "antd";
import OrdersService from "../../services/orders.service";

const useCreate = ({
    onSuccess
} = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (orderData) => OrdersService.createOrder(orderData),

        onSuccess: () => {
            message.success("Mua hàng thành công");
            queryClient.invalidateQueries({
                queryKey: ["orders"]
            });
            onSuccess?.();
        },

        onError: (error) => {
            message.error(
                error?.response?.data?.message || "Mua hàng thất bại"
            );
        },
    });
};

export default useCreate;