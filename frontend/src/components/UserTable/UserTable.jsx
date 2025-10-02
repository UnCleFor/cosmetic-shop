import React from 'react';
import { TableWrapper, Table } from './UserTable.styles';

function UserTable() {
    const users = [
        { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', status: 'Active' },
        { id: 2, name: 'Trần Thị B', email: 'b@example.com', status: 'Inactive' },
    ];

    return (
        <TableWrapper>
            <h3>Danh sách người dùng</h3>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </TableWrapper>
    );
}

export default UserTable;
