import { useQuery } from "@tanstack/react-query";
import OrdersService from "../../services/orders.service";

const useMyOrders = () => {
  return useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const res = await OrdersService.getMyOrders();
      return res.data;
    }
  });
};

export default useMyOrders;