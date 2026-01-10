import React, { useState } from 'react';
import { Table, Select, Tag } from 'antd';

const { Option } = Select;

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    { _id: 1, code: 'DH001', customer: 'Nguyễn Văn A', total: 500000, status: 'pending' },
    { _id: 2, code: 'DH002', customer: 'Trần Thị B', total: 1200000, status: 'processing' },
    { _id: 3, code: 'DH003', customer: 'Lê Văn C', total: 750000, status: 'completed' },
  ]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order._id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#fa8c16';
      case 'processing': return '#1890ff';
      case 'shipping': return '#722ed1';
      case 'completed': return '#52c41a';
      case 'cancelled': return '#ff4d4f';
      default: return '#d9d9d9';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'Chờ xác nhận';
      case 'processing': return 'Đang xử lý';
      case 'shipping': return 'Đang giao hàng';
      case 'completed': return 'Hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  const columns = [
    { 
      title: 'Mã đơn', 
      dataIndex: 'code', 
      key: 'code',
      width: 100 
    },
    { 
      title: 'Khách hàng', 
      dataIndex: 'customer', 
      key: 'customer',
      width: 150 
    },
    { 
      title: 'Tổng tiền', 
      dataIndex: 'total', 
      key: 'total',
      width: 120,
      render: (total) => `${total.toLocaleString('vi-VN')} ₫`
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 160,
      render: (status, record) => (
        <Select 
          value={status} 
          style={{ width: '100%' }}
          onChange={(value) => updateOrderStatus(record._id, value)}
        >
          <Option value="pending">Chờ xác nhận</Option>
          <Option value="processing">Đang xử lý</Option>
          <Option value="shipping">Đang giao hàng</Option>
          <Option value="completed">Hoàn thành</Option>
          <Option value="cancelled">Đã hủy</Option>
        </Select>
      ),
    },
    {
      title: 'Hiển thị',
      key: 'display',
      width: 130,
      render: (_, record) => (
        <Tag 
          color={getStatusColor(record.status)}
          style={{ margin: 0, borderRadius: '4px' }}
        >
          {getStatusText(record.status)}
        </Tag>
      ),
    },
  ];

  return (
    <div className="order-management">
      <Table 
        dataSource={orders} 
        columns={columns} 
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default OrderManagement;