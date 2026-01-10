import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import CosmeticsService from "../../services/cosmetics.service";

const useDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => CosmeticsService.deleteCosmetic(id),

    onSuccess: () => {
      message.success("Xóa sản phẩm thành công");
      queryClient.invalidateQueries({ queryKey: ["cosmetics"] });
    },

    onError: (error) => {
      message.error(error?.message || "Xóa sản phẩm thất bại");
    },
  });
};

export default useDelete;
