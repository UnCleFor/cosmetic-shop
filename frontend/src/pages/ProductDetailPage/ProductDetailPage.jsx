import React, { useState } from "react";
import { Row, Col, InputNumber, Tag, Divider, message } from "antd";
import { ShoppingCartOutlined, TagOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import ProductImageComponent from "../../components/ProductImageComponent/ProductImageComponent";
import useCosmetic from "../../hooks/cosmetic/useCosmetic";
import SpinnerComponent from "../../components/SpinnerComponent/SpinnerComponent";
import "./ProductDetailPage.css";
import useAdd from "../../hooks/cart/useAdd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const ProductDetailPage = () => {
  const { product, isLoading, isError } = useCosmetic();
  const [quantity, setQuantity] = useState(1);
  const addToCart = useAdd()
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const isAuthenticated = Boolean(user);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      message.warning("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
      navigate("/sign-in");
      return;
    }

    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      discount: product.discount,
      image: product.images?.[0] || product.image,
      quantity: quantity,
    });
  };

  if (isError) return <div className="error-message">Không tìm thấy sản phẩm</div>;
  if (!product) return null;

  return (
    <SpinnerComponent isLoading={isLoading}>
      <div className="product-detail-container">
        <Row gutter={[40, 24]}>
          <Col xs={24} md={12}>
            <ProductImageComponent
              images={product.images || product.image}
              name={product.name}
            />
          </Col>

          <Col xs={24} md={12}>
            <div className="product-info">
              <Tag color="blue" className="category-tag">
                <TagOutlined /> {product.category}
              </Tag>

              <h1 className="product-title">{product.name}</h1>
              <div className="product-brand">{product.brand}</div>

              <div className="price-section">
                {product.discount > 0 ? (
                  <>
                    <div className="current-price">
                      {(product.price * (1 - product.discount / 100)).toLocaleString("vi-VN")} ₫
                    </div>
                    <div className="original-price">
                      {product.price.toLocaleString("vi-VN")} ₫
                    </div>
                    <div className="discount-tag">-{product.discount}%</div>
                  </>
                ) : (
                  <div className="current-price">
                    {product.price.toLocaleString("vi-VN")} ₫
                  </div>
                )}
              </div>

              <Divider className="info-divider" />

              <div className="product-description">
                <h3>Mô tả sản phẩm</h3>
                <p>{product.description}</p>
              </div>

              <div className="product-meta">
                <div className="meta-item">
                  <strong>Tình trạng:</strong>
                  <Tag color={product.status === "Còn hàng" ? "green" : "red"}>
                    {product.status}
                  </Tag>
                </div>
              </div>

              <Divider className="action-divider" />

              <div className="action-section">
                <div className="quantity-control">
                  <span className="quantity-label">Số lượng:</span>
                  <InputNumber
                    min={1}
                    max={product.stock || 100}
                    value={quantity}
                    onChange={setQuantity}
                    className="quantity-input"
                  />
                </div>

                <ButtonComponent
                  type="primary"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  onClick={handleAddToCart}
                  className="add-to-cadrt-btn"
                >
                  Thêm vào giỏ hàng
                </ButtonComponent>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </SpinnerComponent>
  );
};

export default ProductDetailPage;