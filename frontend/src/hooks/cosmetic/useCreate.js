import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import CosmeticsService from "../../services/cosmetics.service";

const useCreate = ({
  onSuccess,
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => CosmeticsService.createCosmetic(data),

    onSuccess: () => {
      message.success("Thêm sản phẩm thành công");
      queryClient.invalidateQueries({ queryKey: ["cosmetics"] });
      onSuccess?.();
    },

    onError: (error) => {
      message.error(error?.message || "Thêm sản phẩm thất bại");
    },
  });
};

export default useCreate;
