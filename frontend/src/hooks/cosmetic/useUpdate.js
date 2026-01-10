import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import CosmeticsService from "../../services/cosmetics.service";

const useUpdate = ({
  onSuccess,
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) =>
      CosmeticsService.updateCosmetic(id, data),

    onSuccess: () => {
      message.success("Cập nhật sản phẩm thành công");
      queryClient.invalidateQueries({ queryKey: ["cosmetics"] });
      onSuccess?.();
    },

    onError: (error) => {
      message.error(error?.message || "Cập nhật sản phẩm thất bại");
    },
  });
};

export default useUpdate;