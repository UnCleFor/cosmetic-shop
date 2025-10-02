import React from 'react';
import { TableWrapper, Table } from './ProductTable.styles';

function ProductTable() {
    // Dữ liệu sản phẩm mẫu
    const products = [
        { id: 1, name: 'Sản phẩm A', price: '500,000 VND', quantity: 10 },
        { id: 2, name: 'Sản phẩm B', price: '300,000 VND', quantity: 15 },
        { id: 3, name: 'Sản phẩm C', price: '1,200,000 VND', quantity: 8 },
    ];

    return (
        <TableWrapper>
            <h3>Danh sách sản phẩm</h3>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </TableWrapper>
    );
}

export default ProductTable;
