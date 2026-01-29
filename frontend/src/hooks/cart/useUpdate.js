import { useDispatch } from "react-redux";
import { updateQuantity } from "../../redux/slices/cartSlice";

const useUpdate = () => {
  const dispatch = useDispatch();

  return (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ productId, quantity }));
  };
};

export default useUpdate;
