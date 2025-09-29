import React from 'react';
import FormInput from '../../components/FormInput/FormInput';
import ActionButton from '../../components/ActionButton/ActionButton';
import { Form, FormWrapper } from './AuthLayout.styles';

function AuthLayout({ formData, onChange, onSubmit, actionText }) {
    return (
        <FormWrapper>
            <h2>{actionText === 'Đăng nhập' ? 'Đăng nhập' : 'Đăng ký'}</h2>
            <Form onSubmit={onSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Nhập email của bạn"
                    value={formData.email}
                    onChange={onChange}
                />
                <FormInput
                    label="Mật khẩu"
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    value={formData.password}
                    onChange={onChange}
                />
                {actionText === 'Đăng ký' && (
                    <FormInput
                        label="Xác nhận mật khẩu"
                        type="password"
                        name="confirmPassword"
                        placeholder="Xác nhận mật khẩu"
                        value={formData.confirmPassword}
                        onChange={onChange}
                    />
                )}
                <ActionButton onClick={onSubmit} text={actionText} />
            </Form>
        </FormWrapper>
    );
}

export default AuthLayout;
