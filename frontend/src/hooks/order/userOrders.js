import { useQuery } from "@tanstack/react-query";
import OrdersService from "../../services/orders.service";

const useOrders = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: () => OrdersService.getAllOrders(),
        select: (res) => {
            return res.orders;
        },
    });
};

export default useOrders;
