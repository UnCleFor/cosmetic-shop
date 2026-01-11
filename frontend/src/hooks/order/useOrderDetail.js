import { useQuery } from "@tanstack/react-query";
import OrdersService from "../../services/orders.service";
import { useParams } from "react-router";

const useOrderDetail = () => {
    const { id } = useParams();

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["order", id],
        queryFn: () => OrdersService.getOrderById(id),
        enabled: !!id,
    });

    return {
        data: data || null,
        isLoading,
        isError,
    };
};

export default useOrderDetail;