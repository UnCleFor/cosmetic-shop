import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CosmeticsService from "../../services/cosmetics.service";

const useProductDetail = () => {
    const { id } = useParams();

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["cosmetic", id],
        queryFn: () => CosmeticsService.getCosmeticById(id),
        enabled: !!id,
    });

    return {
        product: data || null,
        isLoading,
        isError,
    };
};

export default useProductDetail;
