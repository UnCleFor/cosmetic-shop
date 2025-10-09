import styled from "styled-components";
import { ShoppingCartOutlined } from "@ant-design/icons";

export const CardWrapper = styled.div`
  transition: transform 0.5s ease;
  &:hover {
    transform: translateY(-10px);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

export const Price = styled.div`
  margin-top: 0.8rem;
  font-size: 1.6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const CartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

export const CartIcon = styled(ShoppingCartOutlined)`
  font-size: 1.8rem;
  cursor: pointer;
  color: #555;
  transition: color 0.3s ease;
  
  ${CartWrapper}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
