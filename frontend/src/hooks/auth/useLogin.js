// hooks/auth/useLogin.js
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import UsersService from "../../services/users.service";
import { useDispatch } from "react-redux"
import { loginSuccess } from "../../redux/slices/userSlice";

const useLogin = (options = {}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: UsersService.login,
        onSuccess: (data) => {
            const { user, accessToken } = data.data

            dispatch(
                loginSuccess({
                    user,
                    accessToken,
                })
            )

            if (options.onSuccess) {
                options.onSuccess(data);
            }
            navigate("/");
        },
        onError: (error) => {
            if (options.onError) {
                options.onError(error);
            }
        },
    });
};

export default useLogin;