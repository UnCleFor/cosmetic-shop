import React from 'react';
import CartItemLayout from '../../layouts/CartItemLayout/CartItemLayout';
import CartSummaryLayout from '../../layouts/CartSummaryLayout/CartSummaryLayout';
import { PageWrapper } from './CartPage.styles';

function CartPage() {
  const cartItems = [
    {
      id: 1,
      name: "Son Guerlain Rouge G",
      price: 1500000,
      quantity: 1,
      image: "https://via.placeholder.com/100x100",
    },
    {
      id: 2,
      name: "Kem dưỡng Guerlain",
      price: 2500000,
      quantity: 2,
      image: "https://via.placeholder.com/100x100",
    },
    {
      id: 3,
      name: "Nước hoa Guerlain",
      price: 3500000,
      quantity: 1,
      image: "https://via.placeholder.com/100x100",
    },
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <PageWrapper>
      <h2>Giỏ hàng của bạn</h2>
      <CartItemLayout cartItems={cartItems} />
      <CartSummaryLayout total={total} />
    </PageWrapper>
  );
}

export default CartPage;
