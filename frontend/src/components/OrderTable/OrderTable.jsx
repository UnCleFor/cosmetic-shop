import React from 'react';
import { TableWrapper, Table } from './OrderTable.styles';

function OrderTable() {
    // Dữ liệu đơn hàng mẫu
    const orders = [
        { id: 1, customer: 'Nguyễn Văn A', total: '1,000,000 VND', status: 'Hoàn tất' },
        { id: 2, customer: 'Trần Thị B', total: '500,000 VND', status: 'Đang xử lý' },
        { id: 3, customer: 'Lê Văn C', total: '2,000,000 VND', status: 'Hoàn tất' },
    ];

    return (
        <TableWrapper>
            <h3>Danh sách đơn hàng</h3>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Khách hàng</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customer}</td>
                            <td>{order.total}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </TableWrapper>
    );
}

export default OrderTable;
