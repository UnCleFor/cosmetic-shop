import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import UsersService from "../../services/users.service";

const useUpdateUserRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId, data }) =>
            UsersService.updateUser(userId, data),

        onSuccess: () => {
            message.success("Đã cập nhật vai trò");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },

        onError: () => {
            message.error("Cập nhật thất bại");
        },
    });
};

export default useUpdateUserRole;