import React, { useContext, useState } from "react";
import { Badge, Button } from "antd";
import NavComponent from "../NavComponent/NavComponent";
import SearchComponent from "../SearchComponent/SearchComponent";
import {
  CloseOutlined,
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import { CartContext } from "../../context/CartContext";
import { userSelector, useDispatch, useSelector } from "react-redux"
import { logout } from "../../redux/slices/userSlice";
import "./HeaderComponent.css";
import SpinnerComponent from "../SpinnerComponent/SpinnerComponent";

function HeaderComponent() {
  const dispath = useDispatch()

  const { user } = useSelector((state) => state.user);
  const isAuthenticated = Boolean(user);
  const [isLoading, setIsLoading] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useContext(CartContext);

  // Xử lý đăng xuất
  const handleLogout = () => {
    setIsLoading(true)
    dispath(logout())
    setIsLoading(false)
  };

  // Chuyển hướng đến trang đăng nhập
  const handleLoginRedirect = () => {
    window.location.href = "/sign-in";
  };

  // Chuyển hướng đến trang đăng ký
  const handleRegisterRedirect = () => {
    window.location.href = "/sign-up";
  };

  // Chuyển hướng đến trang tài khoản
  const handleProfileRedirect = () => {
    window.location.href = "/profile";
  };

  // Chuyển hướng đến trang đơn hàng
  const handleOrdersRedirect = () => {
    window.location.href = "/orders";
  };



  return (
    <>
      <header className="header-wrapper">
        {/* Logo */}
        <div className="logo">
          <a href="/">
            <img
              src="/assets/images/logo.jpg"
              alt="Logo"
              className="logo-image"
            />
          </a>
        </div>

        {/* NavComponent */}
        <NavComponent className="desktop" />

        {/* Search + Icons */}
        <div className="right-actions">
          <SearchComponent placeholder="Tìm kiếm sản phẩm" />

          <SpinnerComponent isLoading={isLoading}>
            {/* Phần xác thực */}
            {isAuthenticated ? (
              // Đã đăng nhập
              <div className="user-profile">
                <div className="user-avatar">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <UserOutlined />
                  )}
                </div>
                <span className="user-name">{user?.name}</span>
                <div className="user-dropdown">
                  <ul>
                    <li onClick={handleProfileRedirect}>
                      <UserOutlined /> Thông tin cá nhân
                    </li>
                    <li onClick={handleOrdersRedirect}>
                      <ShoppingOutlined /> Đơn hàng
                    </li>
                    <li className="divider"></li>
                    <li onClick={handleLogout}>
                      <LogoutOutlined /> Đăng xuất
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              // Chưa đăng nhập
              <div className="auth-container">
                <Button
                  type="text"
                  className="login-btn"
                  onClick={handleLoginRedirect}
                >
                  <UserOutlined className="btn-icon" />
                  Đăng nhập
                </Button>
                <Button
                  type="primary"
                  className="register-btn"
                  onClick={handleRegisterRedirect}
                >
                  Đăng ký
                </Button>
              </div>
            )}
          </SpinnerComponent>

          <button
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>


        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="mobile-nav-wrapper">
            <NavComponent className="mobile" />

            <SpinnerComponent isLoading={isLoading}>
              <div className="mobile-auth">
                {isAuthenticated ? (
                  <div className="mobile-user-info">
                    <div className="mobile-avatar">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} />
                      ) : (
                        <UserOutlined />
                      )}
                    </div>
                    <div>
                      <p className="mobile-user-name">{user?.name}</p>
                      <p className="mobile-user-email">{user?.email}</p>
                    </div>
                    <div className="mobile-user-actions">
                      <Button
                        type="default"
                        onClick={handleProfileRedirect}
                        block
                        className="mobile-profile-btn"
                        icon={<UserOutlined />}
                      >
                        Tài khoản
                      </Button>
                      <Button
                        type="default"
                        onClick={handleOrdersRedirect}
                        block
                        className="mobile-orders-btn"
                        icon={<ShoppingOutlined />}
                      >
                        Đơn hàng
                      </Button>
                      <Button
                        type="default"
                        onClick={handleLogout}
                        block
                        className="mobile-logout-btn"
                        icon={<LogoutOutlined />}
                      >
                        Đăng xuất
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Button
                      block
                      type="default"
                      onClick={() => {
                        handleLoginRedirect();
                        setIsMobileMenuOpen(false);
                      }}
                      className="mobile-login-btn"
                      icon={<UserOutlined />}
                    >
                      Đăng nhập
                    </Button>
                    <Button
                      block
                      type="primary"
                      onClick={() => {
                        handleRegisterRedirect();
                        setIsMobileMenuOpen(false);
                      }}
                      className="mobile-register-btn"
                    >
                      Đăng ký
                    </Button>
                  </>
                )}
              </div>
            </SpinnerComponent>
          </div>
        )}
      </header>

      <div className="header-spacer"></div>
    </>
  );
}

export default HeaderComponent;