import React from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { CardImage, CardWrapper, CartIcon, Price, CartWrapper } from "./ProductCardComponent.styles";

const { Meta } = Card;

const ProductCardComponent = ({ product , onAddToCart}) => {

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/productdetail`);
  };

  return (
    <CardWrapper>
      <Card
        hoverable
        cover={<CardImage src={product.image} alt={product.name} />}
        onClick={handleNavigate}
        actions={[
          <CartWrapper key="cart" onClick={() => onAddToCart && onAddToCart(product)}>
            <CartIcon />
          </CartWrapper>,
        ]}
      >
        <Meta title={product.name} />
        <Price>{product.price.toLocaleString()} VNĐ</Price>
      </Card>
    </CardWrapper>
  );
};

export default ProductCardComponent;