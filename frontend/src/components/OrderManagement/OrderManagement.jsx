import React, { useState } from "react";
import {
  Table, Button, Tag, Modal, Form,
  Select, Input, Space, Popconfirm, Spin
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import useOrders from "../../hooks/order/userOrders";
import useDelete from "../../hooks/order/useHardDelete";
import useUpdate from "../../hooks/order/useUpdate";

const { Option } = Select;
const { TextArea } = Input;

const statusConfig = {
  confirming: { color: "orange", label: "Chờ xác nhận" },
  processing: { color: "blue", label: "Đang xử lý" },
  shipping: { color: "geekblue", label: "Đang giao" },
  completed: { color: "green", label: "Hoàn thành" },
  cancelled: { color: "red", label: "Đã hủy" },
  deleted: { color: "default", label: "Đã xóa" }
};

const OrderManagement = () => {
  const { data: orders, isLoading } = useOrders();
  const updateOrderMutation = useUpdate();
  const deleteOrderMutation = useDelete();
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [form] = Form.useForm();

  const openEditModal = (order) => {
    setSelectedOrder(order);
    form.setFieldsValue({
      status: order.status,
      totalPrice: order.totalPrice,
      name: order.shippingAddress?.name,
      phone: order.shippingAddress?.phone,
      address: order.shippingAddress?.address,
    });
    setOpen(true);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      updateOrderMutation.mutate({
        orderId: selectedOrder._id,
        data: {
          status: values.status,
          totalPrice: values.totalPrice,
          shippingAddress: {
            name: values.name,
            phone: values.phone,
            address: values.address,
          },
        },
      });
      setOpen(false);
    });
  };

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "_id",
      key: "code",
      width: 100
    },
    {
      title: "Khách hàng",
      key: "customer",
      width: 150,
      render: (_, r) => r.shippingAddress?.name,
    },
    {
      title: "Số điện thoại",
      key: "phone",
      width: 120,
      render: (_, r) => r.shippingAddress?.phone || "-",
    },
    {
      title: "Địa chỉ",
      key: "address",
      ellipsis: true,
      render: (_, r) => r.shippingAddress?.address || "-",
    },
    {
      title: "Sản phẩm",
      key: "items",
      render: (_, order) => (
        <div>
          {order.items?.map((item, index) => (
            <div key={index} style={{ marginBottom: 6 }}>
              <strong>{item.name}</strong> × {item.quantity}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 130,
      render: (v) => (
        <span style={{ fontWeight: 500, color: "#d46b08" }}>
          {v?.toLocaleString("vi-VN")} ₫
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (s) => (
        <Tag color={statusConfig[s]?.color}>
          {statusConfig[s]?.label}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 180,
      render: (_, r) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => openEditModal(r)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa đơn?"
            onConfirm={() => deleteOrderMutation.mutate(r._id)}
          >
            <Button danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (isLoading) return <Spin />;

  return (
    <>
      <Table rowKey="_id" columns={columns} dataSource={orders} />

      <Modal
        open={open}
        onOk={handleSave}
        onCancel={() => setOpen(false)}
        title="Cập nhật đơn hàng"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="status" label="Trạng thái">
            <Select>
              {Object.entries(statusConfig).map(([k, v]) => (
                <Option key={k} value={k}>{v.label}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="totalPrice" label="Tổng tiền">
            <Input type="number" />
          </Form.Item>

          <Form.Item name="name" label="Người nhận">
            <Input />
          </Form.Item>

          <Form.Item name="phone" label="SĐT">
            <Input />
          </Form.Item>

          <Form.Item name="address" label="Địa chỉ">
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default OrderManagement;
