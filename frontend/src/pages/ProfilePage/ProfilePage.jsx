import React, { useState } from "react";
import {
  Card,
  Avatar,
  Button,
  Descriptions,
  message,
  Modal,
  Form,
  Input,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LogoutOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/userSlice";
import useUpdate from "../../hooks/user/useUpdate";
import "./ProfilePage.css";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateUserMutation = useUpdate();

  const { user } = useSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    message.success("Đăng xuất thành công");
  };

  const handleEditProfile = () => {
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    setIsModalOpen(true);
  };

  const handleUpdate = (values) => {
    updateUserMutation.mutate(values, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };

  return (
    <div className="profile-page">
      <Card className="profile-card">
        {/* Avatar + Name */}
        <div className="profile-header">
          <Avatar
            size={100}
            src={user.avatar || null}
            icon={!user.avatar && <UserOutlined />}
          />
          <h2 className="profile-name">{user.name}</h2>
        </div>

        {/* User info */}
        <Descriptions bordered column={1} size="middle">
          <Descriptions.Item label={<><MailOutlined /> Email</>}>
            {user.email}
          </Descriptions.Item>

          <Descriptions.Item label={<><PhoneOutlined /> Số điện thoại</>}>
            {user.phone || "Chưa cập nhật"}
          </Descriptions.Item>
        </Descriptions>

        {/* Actions */}
        <div className="profile-actions">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleEditProfile}
            className="update-btn"
          >
            Cập nhật thông tin
          </Button>

          <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>
            Đăng xuất
          </Button>
        </div>
      </Card>

      {/* MODAL UPDATE */}
      <Modal
        title="Cập nhật thông tin"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
        >
          <Form.Item
            label="Tên người dùng"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              { pattern: /^[0-9]{10,11}$/, message: "Số điện thoại không hợp lệ" },
            ]}
          >
            <Input />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={updateUserMutation.isPending}
            block
            className="update-btn"
          >
            Lưu thay đổi
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfilePage;
