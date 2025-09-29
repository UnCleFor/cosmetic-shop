import React from 'react';
import ItemDetails from '../ItemDetails/ItemDetails';
import RemoveButton from '../RemoveButton/RemoveButton';
import { ItemImage, ItemWrapper } from './CartItem.styles';

function CartItem({ item }) {
    return (
        <ItemWrapper>
            <ItemImage src={item.image} alt={item.name} />
            <ItemDetails item={item} />
            <RemoveButton />
        </ItemWrapper>
    );
}

export default CartItem;
