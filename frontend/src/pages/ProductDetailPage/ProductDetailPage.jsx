import React from "react";
import { Row, Col } from "antd";
import { ProductContainer, Title, Description, Price, SectionTitle } from "./ProductDetailPage.styles";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import ProductImageComponent from "../../components/ProductImageComponent/ProductImageComponent";
import ProductCardComponent from "../../components/ProductCardComponent/ProductCardComponent";

const ProductDetailPage = () => {

  const product = {
    id: 1,
    name: "Nước hoa Guerlain Mon Paris",
    price: 3200000,
    image: "./assets/images/sample.png",
    description:
      "Hương thơm tinh tế, ngọt ngào và quyến rũ đến từ thương hiệu Guerlain nổi tiếng. Mang lại cảm giác sang trọng và tự tin cho phái đẹp.",
  };

  // Các sản phẩm liên quan (tính năng dự định sẽ phát triển sau)
  const relatedProducts = [
    { id: 2, name: "Son môi Rouge", price: 950000, image: "./assets/images/sample.png" },
    { id: 3, name: "Kem dưỡng Orchidée", price: 3200000, image: "./assets/images/sample.png" },
    { id: 4, name: "Phấn nền Luminous", price: 1250000, image: "./assets/images/sample.png" },
  ];

  return (
    <ProductContainer>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={10}>
          <ProductImageComponent image={product.image} />
        </Col>

        <Col xs={24} md={14}>
          <Title>{product.name}</Title>
          <Price>{product.price.toLocaleString()} VNĐ</Price>
          <Description>{product.description}</Description>
          <ButtonComponent onClick={() => alert("Thêm vào giỏ hàng")}>Thêm vào giỏ hàng</ButtonComponent>
        </Col>
      </Row>

      <SectionTitle>Sản phẩm liên quan</SectionTitle>
      <Row gutter={[16, 16]}>
        {relatedProducts.map((item) => (
          <Col xs={24} sm={12} md={8} key={item.id}>
            <ProductCardComponent product={item} />
          </Col>
        ))}
      </Row>
    </ProductContainer>
  );
};

export default ProductDetailPage;
