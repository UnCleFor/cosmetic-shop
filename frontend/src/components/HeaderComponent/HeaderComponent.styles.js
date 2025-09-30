import styled from "styled-components";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

export const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-sizing: border-box;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoImage = styled.img`
  height: 40px;
  width: auto;
`;

export const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

export const CartIcon = styled(ShoppingCartOutlined)`
  font-size: 1.8rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({theme}) => theme.colors.primary};
  }
`;

export const UserIcon = styled(UserOutlined)`
  font-size: 1.8rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${({theme}) => theme.colors.primary};
  }
`;