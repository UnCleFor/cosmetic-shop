import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import useSignUp from "../../hooks/auth/useSignUp";
import SpinnerComponent from "../../components/SpinnerComponent/SpinnerComponent";
import "./SignUpPage.css";

const SignUpPage = () => {
  const [form] = Form.useForm();
  const [apiError, setApiError] = useState("");
  const signUpMutation = useSignUp();

  const handleSignUp = (values) => {
    setApiError("");

    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
      confirmPassword: values.confirmPassword,
      agreement: values.agreement
    };

    signUpMutation.mutate(payload, {
      onSuccess: () => {
        form.resetFields();
      },
      onError: (error) => {
        console.log("Error response:", error);

        const errorData = error;

        if (errorData?.message) {
          // Hiển thị message lỗi tổng quát
          setApiError(errorData.message);

          if (errorData.message.includes("Email") ||
            errorData.message.toLowerCase().includes("email")) {
            form.setFields([
              {
                name: 'email',
                errors: [errorData.message]
              }
            ]);
          }
          // Thêm các trường hợp khác nếu cần
          else if (errorData.message.includes("Số điện thoại") ||
            errorData.message.includes("Phone")) {
            form.setFields([
              {
                name: 'phone',
                errors: [errorData.message]
              }
            ]);
          }
          else if (errorData.message.includes("Tên") ||
            errorData.message.includes("Username") ||
            errorData.message.includes("Name")) {
            form.setFields([
              {
                name: 'name',
                errors: [errorData.message]
              }
            ]);
          }
          else if (errorData.message.includes("Mật khẩu") ||
            errorData.message.includes("Password")) {
            form.setFields([
              {
                name: 'password',
                errors: [errorData.message]
              }
            ]);
          }
        }
      },
    });
  };

  if (signUpMutation.isPending) {
    return <SpinnerComponent />;
  }

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <h2>Đăng ký</h2>
            <p>Tạo tài khoản để bắt đầu sử dụng dịch vụ</p>
          </div>

          {/* Hiển thị lỗi tổng quát từ backend */}
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
            onFinish={handleSignUp}
            layout="vertical"
            className="signup-form"
            disabled={signUpMutation.isPending}
          >
            <Form.Item
              name="name"
              label="Tên người dùng"
              rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Nhập tên người dùng"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Nhập email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
                { pattern: /^[0-9]{10,11}$/, message: "Số điện thoại không hợp lệ!" },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Nhập số điện thoại"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập mật khẩu"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập lại mật khẩu"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                        new Error("Bạn phải đồng ý với điều khoản!")
                      ),
                },
              ]}
            >
              <Checkbox>
                Tôi đồng ý với <Link to="/terms">Điều khoản dịch vụ</Link> và <Link to="/privacy">Chính sách bảo mật</Link>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={signUpMutation.isPending}
                block
                size="large"
                className="signup-btn"
              >
                Đăng ký
              </Button>
            </Form.Item>
          </Form>

          <div className="signup-footer">
            <p>
              Đã có tài khoản?{" "}
              <Link to="/sign-in" className="login-link">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;