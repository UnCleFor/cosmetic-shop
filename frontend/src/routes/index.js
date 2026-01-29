import MainLayout from "../layouts/MainLayout/MainLayout";
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
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage"

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductPage /> },
      { path: "product/:id", element: <ProductDetailPage /> },
      { path: "about", element: <AboutUsPage /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
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