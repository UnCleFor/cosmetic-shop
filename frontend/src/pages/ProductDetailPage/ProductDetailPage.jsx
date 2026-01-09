import React, { useContext, useState } from "react";
import { Row, Col, InputNumber } from "antd";
import { 
  ProductContainer, 
  Title, 
  Description, 
  Price, 
  SectionTitle, 
  InfoList, 
  InfoItem 
 } from "./ProductDetailPage";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import ProductImageComponent from "../../components/ProductImageComponent/index";
import ProductCardComponent from "../../components/ProductCardComponent/ProductCardComponent";
import { CartContext } from "../../context/CartContext";

const ProductDetailPage = () => {

  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: 1,
    name: "Nước hoa Guerlain Mon Paris",
    brand: "Guerlain",
    category: "Nước hoa nữ",
    volume: "50ml",
    status: "Còn hàng",
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

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <ProductContainer>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={10}>
          <ProductImageComponent image={product.image} />
        </Col>

        <Col xs={24} md={14}>
          <Title>{product.name}</Title>
          <Price>{product.price.toLocaleString()} VNĐ</Price>
          <InfoList>
            <InfoItem><strong>Thương hiệu:</strong> {product.brand}</InfoItem>
            <InfoItem><strong>Loại sản phẩm:</strong> {product.category}</InfoItem>
            <InfoItem><strong>Dung tích:</strong> {product.volume}</InfoItem>
            <InfoItem><strong>Tình trạng:</strong> {product.status}</InfoItem>
          </InfoList>

          <Description>{product.description}</Description>

          {/* Thanh chọn số lượng */}
          <div style={{ marginBottom: "2rem" }}>
            <span style={{ marginRight: 10, fontSize: "1.5rem" }}>Số lượng:</span>
            <InputNumber
              min={1}
              max={10}
              value={quantity}
              onChange={(value) => setQuantity(value)}
            />
          </div>

          <ButtonComponent onClick={handleAddToCart}>
            Thêm vào giỏ hàng
          </ButtonComponent>
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
}

export default ProductDetailPage;
