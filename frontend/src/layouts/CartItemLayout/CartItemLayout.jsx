import React from 'react';
import CartItem from '../../components/CartItem/CartItem';
import { ItemsList } from './CartItemLayout.styles';

function CartItemLayout({ cartItems }) {
    return (
        <ItemsList>
            {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
            ))}
        </ItemsList>
    );
}

export default CartItemLayout;
