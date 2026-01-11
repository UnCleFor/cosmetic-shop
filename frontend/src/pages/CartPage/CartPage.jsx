import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, InputNumber, Space, Empty, Divider, message, Input } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined, ArrowLeftOutlined, TagOutlined } from '@ant-design/icons';
import './CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { 
      id: '1', 
      productId: 'p1', 
      name: 'Kem dưỡng ẩm La Roche-Posay', 
      price: 350000, 
      originalPrice: 400000, // Giá gốc
      quantity: 2, 
      discount: 12.5, // % giảm giá
      image: '/images/products/product1.jpg',
      stock: 10 
    },
    { 
      id: '2', 
      productId: 'p2', 
      name: 'Sữa rửa mặt Cetaphil', 
      price: 180000, 
      originalPrice: 200000, // Giá gốc
      quantity: 1, 
      discount: 10, // % giảm giá
      image: '/images/products/product2.jpg',
      stock: 5 
    },
    { 
      id: '3', 
      productId: 'p3', 
      name: 'Sữa rửa mặt Cetaphil', 
      price: 180000, 
      originalPrice: 200000, // Giá gốc
      quantity: 1, 
      discount: 10, // % giảm giá
      image: '/images/products/product2.jpg',
      stock: 5 
    },
    { 
      id: '4', 
      productId: 'p4', 
      name: 'Sữa rửa mặt Cetaphil', 
      price: 180000, 
      originalPrice: 200000, // Giá gốc
      quantity: 1, 
      discount: 10, // % giảm giá
      image: '/images/products/product2.jpg',
      stock: 5 
    },
  ]);
  
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0); // Giảm giá từ coupon (VNĐ)

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + ' ₫';
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    message.success('Đã xóa sản phẩm');
  };

  // Tính tổng giảm giá từ % của từng sản phẩm
  const getItemDiscountTotal = () => {
    return cartItems.reduce((sum, item) => {
      const itemDiscount = item.originalPrice ? 
        (item.originalPrice - item.price) * item.quantity : 0;
      return sum + itemDiscount;
    }, 0);
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getOriginalSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const original = item.originalPrice || item.price;
      return sum + (original * item.quantity);
    }, 0);
  };

  const getShippingFee = () => {
    return getSubtotal() > 500000 ? 0 : 30000;
  };

  const getTotal = () => {
    return getSubtotal() + getShippingFee() - couponDiscount;
  };

  const getTotalDiscount = () => {
    return getItemDiscountTotal() + couponDiscount;
  };

  const applyCoupon = () => {
    // Giả lập kiểm tra coupon
    const validCoupons = {
      'SAVE10': 10000,
      'SAVE20': 20000,
      'SALE50': 50000,
    };
    
    if (validCoupons[couponCode.toUpperCase()]) {
      const discount = validCoupons[couponCode.toUpperCase()];
      setCouponDiscount(discount);
      message.success(`Áp dụng mã giảm giá thành công: -${formatPrice(discount)}`);
    } else if (couponCode) {
      message.error('Mã giảm giá không hợp lệ');
      setCouponDiscount(0);
    }
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
                const itemTotal = item.price * item.quantity;
                const originalTotal = (item.originalPrice || item.price) * item.quantity;
                const itemDiscount = originalTotal - itemTotal;
                
                return (
                  <div key={item.id} className="cart-item">
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
                      <div className="current-price">{formatPrice(item.price)}</div>
                      {item.originalPrice && (
                        <div className="original-price">
                          {formatPrice(item.originalPrice)}
                        </div>
                      )}
                    </div>
                    
                    <div className="item-quantity">
                      <InputNumber
                        min={1}
                        max={item.stock}
                        value={item.quantity}
                        onChange={(value) => updateQuantity(item.id, value)}
                      />
                    </div>
                    
                    <div className="item-total">
                      <span className="total-price">{formatPrice(itemTotal)}</span>
                      {itemDiscount > 0 && (
                        <div className="item-savings">
                          Tiết kiệm: {formatPrice(itemDiscount)}
                        </div>
                      )}
                    </div>
                    
                    <div className="item-actions">
                      <Button 
                        danger 
                        icon={<DeleteOutlined />}
                        onClick={() => removeItem(item.id)}
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
              
              {/* <div className="coupon-section">
                <Input
                  placeholder="Nhập mã giảm giá"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  addonAfter={
                    <Button type="link" onClick={applyCoupon}>
                      Áp dụng
                    </Button>
                  }
                />
                {couponDiscount > 0 && (
                  <div className="coupon-applied">
                    Mã giảm giá: -{formatPrice(couponDiscount)}
                  </div>
                )}
              </div> */}
              
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
                
                {/* <div className="summary-row">
                  <span>Phí vận chuyển</span>
                  <span className={getShippingFee() === 0 ? 'free-shipping' : ''}>
                    {getShippingFee() === 0 ? 'Miễn phí' : formatPrice(getShippingFee())}
                  </span>
                </div> */}
                
                {couponDiscount > 0 && (
                  <div className="summary-row coupon">
                    <span>Giảm giá từ coupon</span>
                    <span className="coupon-discount">-{formatPrice(couponDiscount)}</span>
                  </div>
                )}
                
                <Divider />
                
                <div className="summary-row total">
                  <span>Tổng thanh toán</span>
                  <span className="total-amount">{formatPrice(getTotal())}</span>
                </div>
                
                {getTotalDiscount() > 0 && (
                  <div className="total-savings">
                    <TagOutlined /> Bạn đã tiết kiệm được {formatPrice(getTotalDiscount())}
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