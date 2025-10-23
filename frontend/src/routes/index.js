import HomePage from "../pages/HomePage/HomePage";
import ProductPage from "../pages/ProductPage/ProductPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import MainLayout from "../layouts/MainLayout/index";
import ProductDetailPage from "../pages/ProductDetailPage/index";
import SignInPage from "../pages/SignInpage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import CartPage from "../pages/CartPage/CartPage";
import AuthPage from "../pages/AuthPage/AuthPage";
import AdminPage from "../pages/AdminPage/AdminPage";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "product", element: <ProductPage /> },
      { path: "productdetail", element: <ProductDetailPage /> },
      { path: "order", element: <OrderPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "auth", element: <AuthPage /> },
      { path: "admin", element: <AdminPage /> },
    ],
  },
  {
    path: "/signin",
    element: <MainLayout isShowHeader={false} isShowFooter={false} />,
    children: [
      { index: true, element: <SignInPage /> },
    ],
  },
  {
    path: "/signup",
    element: <MainLayout isShowHeader={false} isShowFooter={false} />,
    children: [
      { index: true, element: <SignUpPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> }
];

export default routes;