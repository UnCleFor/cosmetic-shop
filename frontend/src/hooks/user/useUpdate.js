import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import UsersService from "../../services/users.service";
import { updateUser } from "../../redux/slices/userSlice";
import { message } from "antd";

const useUpdate = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.user?._id);

    return useMutation({
        mutationFn: (data) => {
            if (!userId) {
                throw new Error("User chưa đăng nhập");
            }
            return UsersService.updateUser(userId, data);
        },

        onSuccess: (res) => {
            const updatedUser = res.data;

            dispatch(updateUser(updatedUser));
            message.success("Cập nhật thông tin thành công");
        },

        onError: (error) => {
            message.error(
                error.response?.data?.message || "Cập nhật thất bại"
            );
        },
    });
};

export default useUpdate;
