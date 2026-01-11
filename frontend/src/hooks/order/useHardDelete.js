import { useMutation, useQueryClient } from "@tanstack/react-query";
import OrdersService from "../../services/orders.service";
import { message } from "antd";

const useDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId) =>
      OrdersService.deleteOrder(orderId),

    onSuccess: () => {
      message.success("Đã xóa đơn hàng");
      queryClient.invalidateQueries(["orders"]);
    },
  });
};

export default useDelete;
