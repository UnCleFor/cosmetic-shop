// hooks/auth/useSignUp.js
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import UsersService from "../../services/users.service";

const useSignUp = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data) => UsersService.signup(data),
        onSuccess: (response) => {
            if (response?.message) {
                message.success(response.message);
            } else {
                message.success("Đăng ký thành công!");
            }
            navigate("/sign-in");
        },
    });
};

export default useSignUp;