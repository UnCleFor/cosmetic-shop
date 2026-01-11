import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import ProductPage from "../pages/ProductPage/ProductPage";
import CartPage from "../pages/CartPage/CartPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SignInPage from "../pages/SignInpage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import OrderPage from "../pages/OrderPage/OrderPage"
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage"
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import RoleBasedRoute from "../components/RoleBasedRoute/RoleBasedRoute";
import OrderDetailPage from "../pages/OrderDetailPage/OrderDetailPage";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductPage /> },
      { path: "product/:id", element: <ProductDetailPage /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "order/:id",
        element: (
          <ProtectedRoute>
            <OrderDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },

  { path: "/sign-in", element: <SignInPage /> },
  { path: "/sign-up", element: <SignUpPage /> },

  {
    path: "/admin",
    element: <MainLayout isShowFooter={false} />,
    children: [
      {
        index: true,
        element: (
          <RoleBasedRoute requiredRole="admin">
            <AdminPage />
          </RoleBasedRoute>
        ),
      },
    ]
  },
  { path: "*", element: <NotFoundPage /> },
];

export default routes;