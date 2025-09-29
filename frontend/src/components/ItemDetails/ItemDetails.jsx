import React from 'react';
import { DetailsWrapper } from './ItemDetails.styles';

function ItemDetails({ item }) {
    return (
        <DetailsWrapper>
            <h3>{item.name}</h3>
            <p>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            <p>Số lượng: {item.quantity}</p>
        </DetailsWrapper>
    );
}

export default ItemDetails;
