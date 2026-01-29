import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, InputNumber, Empty, Divider, message } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined, ArrowLeftOutlined, TagOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import useRemove from '../../hooks/cart/useRemove';
import useUpdate from '../../hooks/cart/useUpdate';
import './CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const removeFromCart = useRemove();
  const updateCartQuantity = useUpdate();

  const updateQuantity = (productId, quantity) => {
    updateCartQuantity(productId, quantity);
  };

  const removeItem = (productId) => {
    removeFromCart(productId);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + ' ₫';
  };

  const getItemDiscountTotal = () => {
    return cartItems.reduce((sum, item) => {
      const itemDiscount = ((item.price * item.discount / 100) * item.quantity) || 0;
      return sum + itemDiscount;
    }, 0);
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const priceDiscount = (item.price * item.discount / 100);
      return sum + (item.price - priceDiscount) * item.quantity
    }, 0);
  };

  const getOriginalSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const original = item.price;
      return sum + (original * item.quantity);
    }, 0);
  };

  const getShippingFee = () => {
    return getSubtotal() > 500000 ? 0 : 30000;
  };

    const getTotal = () => {
    const subtotal = getSubtotal();
    const shipping = subtotal > 500000 ? 0 : 30000;
    return subtotal + shipping;
  };

  const goToCheckout = () => {
    if (cartItems.length === 0) {
      message.warning('Giỏ hàng của bạn đang trống');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1><ShoppingCartOutlined /> Giỏ hàng</h1>
        <p>Quản lý sản phẩm trong giỏ hàng của bạn</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <Empty description="Giỏ hàng của bạn đang trống">
            <Button type="primary" onClick={() => navigate('/products')}>
              Tiếp tục mua sắm
            </Button>
          </Empty>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            <Card className="cart-items-card">
              <div className="cart-item-header">
                <span>Sản phẩm</span>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <span>Thao tác</span>
              </div>

              <Divider />

              {cartItems.map(item => {
                const priceDiscount = (item.price * item.discount / 100) * item.quantity;
                const itemTotal = item.price * item.quantity - priceDiscount;

                return (
                  <div key={item.productId} className="cart-item">
                    <div className="item-info">
                      <img src={item.image} alt={item.name} className="item-image" />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        {item.discount > 0 && (
                          <span className="item-discount-badge">
                            <TagOutlined /> Giảm {item.discount}%
                          </span>
                        )}
                        <p className="item-stock">Còn {item.stock} sản phẩm</p>
                      </div>
                    </div>

                    <div className="item-price">
                      <div className="current-price">{formatPrice(item.price - priceDiscount)}</div>
                      {item.discount > 0 && (
                        <div className="original-price">
                          {formatPrice(item.price)}
                        </div>
                      )}
                    </div>

                    <div className="item-quantity">
                      <InputNumber
                        min={1}
                        max={item.stock}
                        value={item.quantity}
                        onChange={(value) => updateQuantity(item.productId, value)}
                      />
                    </div>

                    <div className="item-total">
                      <span className="total-price">{formatPrice(itemTotal)}</span>
                      {item.discount > 0 && (
                        <div className="item-savings">
                          Tiết kiệm: {formatPrice(priceDiscount)}
                        </div>
                      )}
                    </div>

                    <div className="item-actions">
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removeItem(item.productId)}
                      />
                    </div>
                  </div>
                );
              })}
            </Card>
          </div>

          <div className="cart-summary">
            <Card className="summary-card">
              <h3>Tóm tắt đơn hàng</h3>

              <div className="summary-details">
                <div className="summary-row">
                  <span>Tổng giá gốc</span>
                  <span className="original-total">{formatPrice(getOriginalSubtotal())}</span>
                </div>

                {getItemDiscountTotal() > 0 && (
                  <div className="summary-row discount">
                    <span>Giảm giá sản phẩm</span>
                    <span className="discount-amount">-{formatPrice(getItemDiscountTotal())}</span>
                  </div>
                )}

                <div className="summary-row">
                  <span>Tạm tính</span>
                  <span>{formatPrice(getSubtotal())}</span>
                </div>

                <div className="summary-row">
                  <span>Phí vận chuyển</span>
                  <span className={getShippingFee() === 0 ? 'free-shipping' : ''}>
                    {getShippingFee() === 0 ? 'Miễn phí' : formatPrice(getShippingFee())}
                  </span>
                </div>

                <Divider />

                <div className="summary-row total">
                  <span>Tổng thanh toán</span>
                  <span className="total-amount">{formatPrice(getTotal())}</span>
                </div>

                {getItemDiscountTotal() > 0 && (
                  <div className="total-savings">
                    <TagOutlined /> Bạn đã tiết kiệm được {formatPrice(getItemDiscountTotal())}
                  </div>
                )}
              </div>

              <Button
                type="primary"
                size="large"
                block
                onClick={goToCheckout}
                className="checkout-btn"
              >
                Tiến hành thanh toán
              </Button>

              <Link to="/products">
                <Button
                  type="link"
                  block
                  icon={<ArrowLeftOutlined />}
                  className="continue-btn"
                >
                  Tiếp tục mua sắm
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;