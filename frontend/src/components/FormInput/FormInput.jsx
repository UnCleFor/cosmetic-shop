import React from 'react';
import { InputWrapper, Label, Input } from './FormInput.styles';

function FormInput({ label, type, name, placeholder, value, onChange }) {
    return (
        <InputWrapper>
            <Label>{label}</Label>
            <Input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </InputWrapper>
    );
}

export default FormInput;
