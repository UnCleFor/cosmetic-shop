import React from 'react';
import { SummaryWrapper, CheckoutButton } from './CartSummaryLayout.styles';

function CartSummaryLayout({ total }) {
    return (
        <SummaryWrapper>
            <p>Tổng cộng: {total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            <CheckoutButton>Tiến hành thanh toán</CheckoutButton>
        </SummaryWrapper>
    );
}

export default CartSummaryLayout;
