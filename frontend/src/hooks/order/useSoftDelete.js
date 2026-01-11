import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import OrdersService from "../../services/orders.service";

const useSoftDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId) =>
      OrdersService.updateOrder(orderId, { status: "deleted" }),

    onSuccess: () => {
      message.success("Đã xóa đơn hàng");
      queryClient.invalidateQueries(["my-orders"]);
    },

    onError: (error) => {
      message.error(error.response?.data?.message || "Xóa đơn thất bại");
    }
  });
};

export default useSoftDelete;
