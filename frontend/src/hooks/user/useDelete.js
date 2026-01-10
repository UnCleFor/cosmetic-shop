import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import UsersService from "../../services/users.service";

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId) => UsersService.deleteUser(userId),

    onSuccess: () => {
      message.success("Đã xóa người dùng");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: () => {
      message.error("Xóa thất bại");
    },
  });
};

export default useDeleteUser;