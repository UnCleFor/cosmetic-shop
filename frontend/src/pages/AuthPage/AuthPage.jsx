import React, { useState } from 'react';
import AuthLayout from '../../layouts/AuthLayout/AuthLayout';
import { PageWrapper } from './AuthPage.styles';

function AuthPage({ mode }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '', // Dùng cho đăng ký
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === 'login') {
            console.log('Đăng nhập với:', formData);
            // Gọi API đăng nhập
        } else if (mode === 'register') {
            console.log('Đăng ký với:', formData);
            // Gọi API đăng ký
        }
    };

    return (
        <PageWrapper>
            <AuthLayout
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                actionText={mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}
            />
        </PageWrapper>
    );
}

export default AuthPage;
