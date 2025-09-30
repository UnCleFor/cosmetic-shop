// src/components/NavComponent/NavComponent.jsx
import React from "react";
import { Nav } from "./NavComponent.styles";

function NavComponent() {
  return (
    <Nav>
      <a href="/">Trang chủ</a>
      <a href="/product">Sản phẩm</a>
      <a href="/order">Đơn hàng</a>
      <a href="/about">Về chúng tôi</a>
    </Nav>
  );
}

export default NavComponent;