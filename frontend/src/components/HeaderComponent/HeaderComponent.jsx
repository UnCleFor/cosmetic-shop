import React from "react";
import { Input, Badge } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { HeaderWrapper, Logo, Nav, RightActions } from "./HeaderComponent.styles";

const { Search } = Input;

function HeaderComponent() {
  return (
    <HeaderWrapper>
      {/* Logo */}
      <Logo>GUERLAIN</Logo>

      {/* Navigation */}
      <Nav>
        <a href="/">Trang chủ</a>
        <a href="/product">Sản phẩm</a>
        <a href="/order">Đơn hàng</a>
        <a href="/about">Về chúng tôi</a>
      </Nav>

      {/* Search + Icons */}
      <RightActions>
        <Search
          placeholder="Tìm kiếm mỹ phẩm..."
          allowClear
          onSearch={(value) => console.log(value)}
          style={{ width: 200 }}
        />
        <UserOutlined style={{ fontSize: "1.8rem", cursor: "pointer" }} />
        <Badge count={2} size="small">
          <ShoppingCartOutlined style={{ fontSize: "1.8rem", cursor: "pointer" }} />
        </Badge>
      </RightActions>
    </HeaderWrapper>
  );
}

export default HeaderComponent;