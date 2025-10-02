import React from 'react';
import AdminLayout from '../../layouts/AdminLayout/AdminLayout';
import UserTable from '../../components/UserTable/UserTable';
import ProductTable from '../../components/ProductTable/ProductTable';
import OrderTable from '../../components/OrderTable/OrderTable';
import { PageTitle, SectionTitle } from './AdminPage.styles';

function AdminPage() {
    return (
        <AdminLayout>
            <PageTitle>TRANG QUẢN TRỊ</PageTitle>
            <SectionTitle>Quản lý người dùng</SectionTitle>
            <UserTable />
            <SectionTitle>Quản lý sản phẩm</SectionTitle>
            <ProductTable />
            <SectionTitle>Quản lý đơn hàng</SectionTitle>
            <OrderTable />
        </AdminLayout>
    );
}

export default AdminPage;
