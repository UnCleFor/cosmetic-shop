import { useDispatch } from "react-redux";
import { message } from "antd";
import { removeFromCart } from "../../redux/slices/cartSlice";

const useRemove = () => {
  const dispatch = useDispatch();

  return (productId) => {
    dispatch(removeFromCart(productId));
    message.success("Đã xóa sản phẩm");
  };
};

export default useRemove;