import React from "react";
import { Input, Badge } from "antd";
import { CartIcon, UserIcon, HeaderWrapper, Logo, LogoImage, RightActions } from "./HeaderComponent.styles";
import NavComponent from "../NavComponent/NavComponent";
import SearchComponent from "../SearchComponent/SearchComponent";

const { Search } = Input;

function HeaderComponent() {
  return (
    <HeaderWrapper>
      {/* Logo */}
      <Logo>
        <a href="/"><LogoImage src="/assets/images/logo.jpg" alt="Logo" /></a>
      </Logo>

      {/* Navigation */}
      <NavComponent />

      {/* Search + Icons */}
      <RightActions>
        <SearchComponent placeholder="Tìm kiếm sản phẩm"/>
        <Badge count={4} size="small">
          <CartIcon style={{ fontSize: "1.8rem", cursor: "pointer" }} />
        </Badge>
        <UserIcon style={{ fontSize: "1.8rem", cursor: "pointer" }} />
      </RightActions>
    </HeaderWrapper>
  );
}

export default HeaderComponent;