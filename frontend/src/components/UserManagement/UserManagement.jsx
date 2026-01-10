import React, { useState, useMemo } from "react";
import { Table, Select, Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import SpinnerComponent from "../SpinnerComponent/SpinnerComponent";
import useUsers from "../../hooks/user/useUsers";
import useUpdateUserRole from "../../hooks/user/userUpdateUserRole";
import useDeleteUser from "../../hooks/user/useDelete";

const { Option } = Select;

const UserManagement = () => {
    const [page, setPage] = useState(1);
    const limit = 8;

    const queryParams = useMemo(
        () => ({ page, limit }),
        [page, limit]
    );

    const { data, isLoading, isFetching, isError } = useUsers(queryParams);
    const updateRoleMutation = useUpdateUserRole();
    const deleteUserMutation = useDeleteUser();

    const users = data?.users || [];
    const total = data?.total || 0;

    const columns = [
        {
            title: "STT",
            render: (_, __, index) => (page - 1) * limit + index + 1,
            width: 60,
        },
        {
            title: "Tên",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            width: 120,
        },
        {
            title: "Vai trò",
            dataIndex: "role",
            width: 120,
            render: (role, record) => (
                <Select
                    value={role}
                    onChange={(value) =>
                        updateRoleMutation.mutate({
                            userId: record._id,
                            data: { role: value },
                        })
                    }
                >
                    <Option value="user">User</Option>
                    <Option value="admin">Admin</Option>
                </Select>
            ),
        },
        {
            title: "Thao tác",
            width: 100,
            render: (_, record) => (
                <Popconfirm
                    title="Xóa người dùng này?"
                    onConfirm={() => deleteUserMutation.mutate(record._id)}
                >
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                        loading={
                            deleteUserMutation.isLoading &&
                            deleteUserMutation.variables === record._id
                        }
                    >
                        Xóa
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    if (isError) {
        return <p style={{ color: "red" }}>Không thể tải danh sách người dùng</p>;
    }

    return (
        <SpinnerComponent isLoading={isLoading}>
            <Table
                rowKey="_id"
                dataSource={users}
                columns={columns}
                pagination={{
                    current: page,
                    pageSize: limit,
                    total,
                    onChange: setPage,
                    showSizeChanger: false,
                }}
                loading={isFetching}
            />
        </SpinnerComponent>
    );
};

export default UserManagement;