import React from "react";
import { Card, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./ProductCardComponent.css";
import useAdd from "../../hooks/cart/useAdd";
import { useSelector } from "react-redux";

const { Meta } = Card;

const ProductCardComponent = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const addToCart = useAdd();
  const { user } = useSelector((state) => state.user);

  const isAuthenticated = Boolean(user);

  const handleNavigate = () => {
    navigate(`/product/${product._id}`);
  }

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
      quantity: 1,
    });
  };

  // Hàm format giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
  };

  return (
    <div className="product-card-wrapper" key={product._id}>
      <Card
        hoverable
        cover={
          <div className="card-image-container">
            <img
              src={product.images?.[0] || product.image || "/placeholder.jpg"}
              alt={product.name}
              className="card-image"
            />
            {/* Chỉ hiển thị badge nếu có discount > 0 */}
            {product.discount > 0 && (
              <div className="discount-badge">
                -{product.discount}%
              </div>
            )}
          </div>
        }
        onClick={handleNavigate}
        actions={[
          <div key="cart" className="cart-wrapper" onClick={handleAddToCart}>
            <ShoppingCartOutlined className="cart-icon" />
          </div>
        ]}
      >
        <Meta
          title={<div className="product-name">{product.name}</div>}
          description={<div className="product-brand">{product.brand}</div>}
        />

        {/* Hiển thị giá */}
        <div className="price-section">
          {product.discount > 0 ? (
            <>
              <div className="original-price">
                {formatPrice(product.price)}
              </div>
              <div className="current-price">
                {formatPrice(product.price * (1 - product.discount / 100))}
              </div>
            </>
          ) : (
            <div className="current-price no-discount">
              {formatPrice(product.price)}
            </div>
          )}
        </div>

        {/* Chỉ hiển thị sold nếu > 0 */}
        {product.sold > 0 && (
          <div className="sold-text">
            Đã bán: {product.sold.toLocaleString('vi-VN')}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductCardComponent;