import { useDispatch } from "react-redux";
import { message } from "antd";
import { clearCart } from "../../redux/slices/cartSlice";

const useClear = () => {
  const dispatch = useDispatch();

  return () => {
    dispatch(clearCart());
    message.success("Đã xóa toàn bộ giỏ hàng");
  };
};

export default useClear;