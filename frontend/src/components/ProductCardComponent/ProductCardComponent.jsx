import React from "react";
import { Card, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux"
import "./ProductCardComponent.css";

const { Meta } = Card;

const ProductCardComponent = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = () => {
    navigate(`/product/${product._id}`);
  }

  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log("ADD PRODUCT:", {
      id: product._id,
      name: product.name
    });

    dispatch(addToCart({
      productId: product._id,
      name: product.name,
      price:
        product.discount > 0
          ? product.price * (1 - product.discount / 100)
          : product.price,
      image: product.images?.[0] || product.image,
      quantity: 1,
    }));

    message.success("Đã thêm vào giỏ hàng");
  };

  // Hàm format giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
  };

  return (
    <div className="product-card-wrapper">
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