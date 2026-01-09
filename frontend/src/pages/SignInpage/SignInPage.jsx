import React from "react";
import { Form, Input, Button, message, Divider, Alert } from "antd";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import useLogin from "../../hooks/auth/useLogin";
import SpinnerComponent from "../../components/SpinnerComponent/SpinnerComponent";
import "./SignInPage.css";

const SignInPage = () => {
  const [form] = Form.useForm();
  const [apiError, setApiError] = React.useState("");

  const loginMutation = useLogin({
    onSuccess: (data) => {
      if (data.message) {
        message.success(data.message);
      }
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message
        || error.response?.data?.error
        || error?.message
        || "Đăng nhập thất bại! Vui lòng thử lại.";

      setApiError(errorMessage);
    },
  });

  const handleLogin = (values) => {
    setApiError("");
    loginMutation.mutate(values);
  };

  const handleGoogleLogin = () => {
    message.info("Tính năng đăng nhập bằng Google đang phát triển");
  };

  const handleFacebookLogin = () => {
    message.info("Tính năng đăng nhập bằng Facebook đang phát triển");
  };

  if (loginMutation.status === 'pending') {
    return <SpinnerComponent />;
  }

  return (
    <div className="signin-page">
      <div className="signin-container">
        <div className="signin-card">
          <div className="signin-header">
            <h2>Đăng nhập</h2>
          </div>

          {apiError && (
            <Alert
              message={apiError}
              type="error"
              showIcon
              closable
              onClose={() => setApiError("")}
              style={{ marginBottom: 16 }}
            />
          )}

          <Form
            form={form}
            onFinish={handleLogin}
            layout="vertical"
            className="signin-form"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                size="large"
                disabled={loginMutation.status === 'loading'}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Mật khẩu"
                size="large"
                disabled={loginMutation.status === 'loading'}
              />
            </Form.Item>

            <div className="form-options">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loginMutation.status === 'loading'}
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
              disabled={loginMutation.status === 'loading'}
            >
              Google
            </Button>
            <Button
              icon={<FacebookFilled />}
              onClick={handleFacebookLogin}
              className="facebook-btn"
              block
              size="large"
              disabled={loginMutation.status === 'loading'}
            >
              Facebook
            </Button>
          </div>

          <div className="signin-footer">
            <p>
              Chưa có tài khoản?{" "}
              <Link to="/sign-up" className="sign-up-link">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;