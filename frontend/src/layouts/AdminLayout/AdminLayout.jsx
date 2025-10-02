import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { AdminWrapper, ContentWrapper } from './AdminLayout.styles';

function AdminLayout({ children }) {
    return (
        <AdminWrapper>
            <Sidebar />
            <ContentWrapper>{children}</ContentWrapper>
        </AdminWrapper>
    );
}

export default AdminLayout;
