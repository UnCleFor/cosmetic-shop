import React from 'react';
import { Button } from './ActionButton.styles';

function ActionButton({ onClick, text }) {
    return <Button onClick={onClick}>{text}</Button>;
}

export default ActionButton;
