import React, { useState } from 'react';
import { Tabs } from 'antd';
import { DashboardOutlined } from '@ant-design/icons';
import UserManagement from '../../components/UserManagement/UserManagement';
import OrderManagement from '../../components/OrderManagement/OrderManagement';
import CosmeticManagement from '../../components/CosmeticManagement/CosmeticManagement';
import './AdminPage.css';

const { TabPane } = Tabs;

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">
          <DashboardOutlined />
          Trang Quản Trị
        </h1>
        <p className="admin-subtitle">
          Quản lý người dùng, đơn hàng và sản phẩm
        </p>
      </div>

      <div className="admin-tabs">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Người dùng" key="users">
            <UserManagement />
          </TabPane>
          <TabPane tab="Đơn hàng" key="orders">
            <OrderManagement />
          </TabPane>
          <TabPane tab="Sản phẩm" key="cosmetics">
            <CosmeticManagement />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;