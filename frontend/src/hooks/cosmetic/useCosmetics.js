import { useQuery } from "@tanstack/react-query";
import CosmeticsService from "../../services/cosmetics.service";

const useCosmetics = (queryParams) => {
  return useQuery({
    queryKey: ["cosmetics", queryParams],
    queryFn: () => CosmeticsService.getCosmetics(queryParams),
    keepPreviousData: true,
  });
};

export default useCosmetics;