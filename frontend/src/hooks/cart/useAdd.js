import { useDispatch } from "react-redux";
import { message } from "antd";
import { addToCart } from "../../redux/slices/cartSlice";

const useAdd = () => {
  const dispatch = useDispatch();

  return (item) => {
    dispatch(addToCart(item));
    message.success("Đã thêm vào giỏ hàng");
  };
};

export default useAdd;
