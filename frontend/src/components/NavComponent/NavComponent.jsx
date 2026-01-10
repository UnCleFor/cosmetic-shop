import React from "react";
import "./NavComponent.css";

function NavComponent({ className }) {
  return (
    <nav className={`nav-component ${className}`}>
      <a href="/">Trang chủ</a>
      <a href="/products">Sản phẩm</a>
      <a href="/about">Về chúng tôi</a>
    </nav>
  );
}

export default NavComponent;