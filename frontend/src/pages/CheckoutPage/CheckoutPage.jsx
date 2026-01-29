import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, Radio, Divider, message } from 'antd';
import { UserOutlined, PhoneOutlined, HomeOutlined, CreditCardOutlined } from '@ant-design/icons';
import './CheckoutPage.css';
import { useSelector } from 'react-redux';
import useClear from '../../hooks/cart/useClear';
import useCreate from '../../hooks/order/useCreate';

const { TextArea } = Input;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const clearCart = useClear();

  const useCreateOrder = useCreate();
  const cartItems = useSelector((state) => state.cart.items);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const { mutate: createOrder, isLoading } = useCreate({
    onSuccess: () => {
      clearCart();
      navigate("/orders");
    },
  });

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + ' ₫';
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const priceDiscount = (item.price * item.discount / 100);
      return sum + (item.price - priceDiscount) * item.quantity
    }, 0);
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const shipping = subtotal > 500000 ? 0 : 30000;
    return subtotal + shipping;
  };

  // const handlePlaceOrder = async () => {
  //   try {
  //     const values = await form.validateFields();
  //     setLoading(true);

  //     // Giả lập API call
  //     await new Promise(resolve => setTimeout(resolve, 1000));

  //     const orderData = {
  //       shippingAddress: {
  //         name: values.name,
  //         phone: values.phone,
  //         address: values.address,
  //       },

  //       paymentMethod,

  //       items: cartItems.map(item => ({
  //         product: item.productId,
  //         name: item.name,
  //         price: item.price,
  //         quantity: item.quantity,
  //         image: item.image,
  //       })),

  //       totalPrice: getTotal(),
  //     };

  //     console.log('Tạo đơn:', orderData);

  //     message.success('Mua hàng thành công!');
  //     navigate('/orders');

  //   } catch (error) {
  //     console.log('Lỗi:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handlePlaceOrder = async () => {
    try {
      const values = await form.validateFields();

      const orderData = {
        shippingAddress: {
          name: values.name,
          phone: values.phone,
          address: values.address,
        },
        paymentMethod,
        items: cartItems.map(item => ({
          product: item.productId,
          discount: item.discount,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totalPrice: getTotal(),
      };

      createOrder(orderData);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Thanh toán</h1>
      </div>

      <div className="checkout-content">
        <div className="checkout-form">
          <Card title="Thông tin giao hàng" className="info-card">
            <Form
              form={form}
              layout="vertical"
            >
              <Form.Item
                name="name"
                label="Họ và tên"
                rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
              >
                <Input
                  placeholder="Nhập họ và tên"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại' },
                  { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ' }
                ]}
              >
                <Input
                  placeholder="Nhập số điện thoại"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="address"
                label="Địa chỉ giao hàng"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
              >
                <TextArea
                  placeholder="Nhập đầy đủ địa chỉ"
                  rows={3}
                />
              </Form.Item>
            </Form>
          </Card>

          <Card title="Phương thức thanh toán" className="payment-card">
            <Radio.Group
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <Radio value="cod">
                <span style={{ fontWeight: 500 }}>Thanh toán khi nhận hàng (COD)</span>
              </Radio>
            </Radio.Group>
          </Card>
        </div>

        <div className="order-summary">
          <Card title="Đơn hàng của bạn" className="summary-card">
            <div className="order-items">
              {cartItems.map(item => {
                const priceDiscount = (item.price * item.discount / 100) * item.quantity;
                const itemTotal = item.price * item.quantity - priceDiscount;

                return (
                  <div key={item.productId} className="order-item">
                    <div className="item-name">
                      <span>{item.name}</span>
                      <span className="item-quantity">x{item.quantity}</span>
                    </div>
                    <div className="item-price">
                      {formatPrice(itemTotal)}
                    </div>
                  </div>
                )
              })}
            </div>

            <Divider />

            <div className="price-breakdown">
              <div className="price-row">
                <span>Tạm tính</span>
                <span>{formatPrice(getSubtotal())}</span>
              </div>

              <div className="price-row">
                <span>Phí vận chuyển</span>
                <span>
                  {getSubtotal() > 500000 ? 'Miễn phí' : formatPrice(30000)}
                </span>
              </div>

              {getSubtotal() < 500000 && (
                <div className="shipping-note">
                  Mua thêm {formatPrice(500000 - getSubtotal())} để được miễn phí vận chuyển
                </div>
              )}

              <Divider />

              <div className="price-row total">
                <span>Tổng thanh toán</span>
                <span className="total-price">{formatPrice(getTotal())}</span>
              </div>
            </div>

            <Button
              type="primary"
              size="large"
              block
              loading={loading}
              onClick={handlePlaceOrder}
              className="place-order-btn"
            >
              Mua hàng
            </Button>

            <Button
              type="link"
              block
              onClick={() => navigate('/cart')}
              className="back-btn"
            >
              ← Quay lại giỏ hàng
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;