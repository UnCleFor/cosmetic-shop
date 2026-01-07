import React, { useState } from 'react';
import { Form, Input, Button, message, Divider } from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  GoogleOutlined, 
  FacebookFilled 
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './SignInPage.css';

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      console.log('Login values:', values);
      
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Thay thế bằng API thực tế
      if (values.email && values.password) {
        message.success('Đăng nhập thành công!');
        
        // Lưu thông tin vào localStorage (tạm thời)
        localStorage.setItem('user', JSON.stringify({
          name: 'Nguyễn Văn A',
          email: values.email
        }));
        
        // Chuyển hướng về trang chủ
        navigate('/');
      } else {
        message.error('Vui lòng nhập đầy đủ thông tin!');
      }
    } catch (error) {
      message.error('Đăng nhập thất bại! Vui lòng thử lại.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    message.info('Tính năng đăng nhập bằng Google đang phát triển');
  };

  const handleFacebookLogin = () => {
    message.info('Tính năng đăng nhập bằng Facebook đang phát triển');
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <div className="signin-card">
          <div className="signin-header">
            <h2>Đăng nhập</h2>
          </div>
          
          <Form
            form={form}
            onFinish={handleLogin}
            layout="vertical"
            className="signin-form"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' }
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Mật khẩu"
                size="large"
              />
            </Form.Item>

            <div className="form-options">
              <Form.Item>
                <Button
                  type="primary"
htmlType="submit"
                  loading={loading}
                  block
                  size="large"
                  className="signin-btn"
                >
                  Đăng nhập
                </Button>
              </Form.Item>

              <div className="forgot-password">
                <Link to="/forgot-password">Quên mật khẩu?</Link>
              </div>
            </div>
          </Form>

          <Divider>Hoặc đăng nhập với</Divider>

          <div className="social-login">
            <Button
              icon={<GoogleOutlined />}
              onClick={handleGoogleLogin}
              className="google-btn"
              block
              size="large"
            >
              Google
            </Button>
            <Button
              icon={<FacebookFilled />}
              onClick={handleFacebookLogin}
              className="facebook-btn"
              block
              size="large"
            >
              Facebook
            </Button>
          </div>

          <div className="signin-footer">
            <p>
              Chưa có tài khoản?{' '}
              <Link to="/sign-up" className="sign-up-link">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;