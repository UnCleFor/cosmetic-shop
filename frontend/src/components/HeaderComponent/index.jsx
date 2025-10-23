import React, { useContext, useState } from "react";
import { Badge } from "antd";
import {
  CartIcon,
  UserIcon, 
  HeaderWrapper, 
  Logo, 
  LogoImage, 
  RightActions, 
  MobileMenuButton, 
  MobileNavWrapper
} from "./styles";
import NavComponent from "../NavComponent/NavComponent";
import SearchComponent from "../SearchComponent/SearchComponent";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { CartContext } from "../../context/CartContext";

function HeaderComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useContext(CartContext);

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
        <Badge count={cartCount} size="small" offset={[5, 0]}>
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