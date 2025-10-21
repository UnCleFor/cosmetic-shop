import styled from "styled-components";
import {
  ShoppingCartOutlined,
  UserOutlined
} from "@ant-design/icons";

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

  @media (max-width: 768px) {
    padding: 1.2rem 1.6rem;
  }
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

  @media (max-width: 768px) {
    gap: 1rem;

    input {
      display: none;
    }
  }
`;

export const CartIcon = styled(ShoppingCartOutlined)`
  font-size: 1.8rem;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const UserIcon = styled(UserOutlined)`
  font-size: 1.8rem;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const MobileMenuButton = styled.div`
  display: none;
  font-size: 1.8rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileNavWrapper = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  z-index: 999;

  a {
    padding: 0.8rem 0;
    font-size: 1.6rem;
    text-transform: uppercase;
    color: #000;
    text-decoration: none;
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
