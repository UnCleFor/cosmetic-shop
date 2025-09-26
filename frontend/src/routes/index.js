import HomePage from "../pages/HomePage/HomePage";
import ProductPage from "../pages/ProductPage/ProductPage";
import OrderPage from "../pages/OrderPage/OrderPage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/product", element: <ProductPage /> },
  { path: "/order", element: <OrderPage /> }
];

export default routes;