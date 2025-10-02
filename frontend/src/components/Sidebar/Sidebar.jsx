import React, { useState } from 'react';
import { SidebarWrapper, MenuButton, NavLink } from './Sidebar.styles';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);  // Điều khiển việc mở và đóng Sidebar

    const toggleSidebar = () => setIsOpen(!isOpen);  // Hàm toggle sidebar

    return (
        <>
            {/* Nút Menu - Luôn hiển thị khi sidebar đóng */}
            <MenuButton onClick={toggleSidebar}>
                {isOpen ? <CloseOutlined /> : <MenuOutlined />}
            </MenuButton>

            {/* Sidebar */}
            <SidebarWrapper isOpen={isOpen}>
                <NavLink href="/admin/users">Quản lý người dùng</NavLink>
                <NavLink href="/admin/products">Quản lý sản phẩm</NavLink>
                <NavLink href="/admin/orders">Quản lý đơn hàng</NavLink>
            </SidebarWrapper>
        </>
    );
}

export default Sidebar;
