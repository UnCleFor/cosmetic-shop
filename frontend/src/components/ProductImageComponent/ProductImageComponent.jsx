import React from "react";
import { ImageWrapper, Image } from "./ProductImageComponent.styles";   

const ProductImageComponent = ({ image }) => {
  return (
    <ImageWrapper>
      <Image src={image} alt="product" />
    </ImageWrapper>
  );
};

export default ProductImageComponent;
