import React, { useState } from "react";
import { Badge } from "antd";
import { CartIcon, UserIcon, HeaderWrapper, Logo, LogoImage, RightActions, MobileMenuButton, MobileNavWrapper } from "./HeaderComponent.styles";
import NavComponent from "../NavComponent/NavComponent";
import SearchComponent from "../SearchComponent/SearchComponent";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";

function HeaderComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <HeaderWrapper>
      {/* Logo */}
      <Logo>
        <a href="/"><LogoImage src="/assets/images/logo.jpg" alt="Logo" /></a>
      </Logo>

      {/* Navigation */}
      <NavComponent className="desktop" />

      {/* Search + Icons */}
      <RightActions>
        <SearchComponent placeholder="Tìm kiếm sản phẩm" />
        <Badge count={4} size="small">
          <CartIcon style={{ fontSize: "1.8rem", cursor: "pointer" }} />
        </Badge>
        <UserIcon style={{ fontSize: "1.8rem", cursor: "pointer" }} />
        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </MobileMenuButton>
      </RightActions>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <MobileNavWrapper>
          <NavComponent className="mobile" />
        </MobileNavWrapper>
      )}
    </HeaderWrapper>
  );
}

export default HeaderComponent;