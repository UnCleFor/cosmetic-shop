import React, { useState, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    InputNumber,
    Select,
    Tag,
    Popconfirm,
    Space,
    message,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import SpinnerComponent from "../SpinnerComponent/SpinnerComponent";
import useCosmetics from "../../hooks/cosmetic/useCosmetics";
import useCreate from "../../hooks/cosmetic/useCreate";
import useUpdate from "../../hooks/cosmetic/useUpdate";
import useDelete from "../../hooks/cosmetic/useDelete";

const { Option } = Select;

const CosmeticManagement = () => {
    const queryClient = useQueryClient();
    const [modalVisible, setModalVisible] = useState(false);
    const [editingCosmetic, setEditingCosmetic] = useState(null);
    const [form] = Form.useForm();

    // State cho phân trang và filter
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    const limit = 8;

    // Query params cho API
    const queryParams = useMemo(() => ({
        page,
        limit,
        ...(categoryFilter && { category: categoryFilter }),
        ...(statusFilter && { status: statusFilter }),
    }), [page, limit, categoryFilter, statusFilter]);

    const {
        data,
        isLoading,
        isFetching,
        isError,
    } = useCosmetics(queryParams);

    const createCosmeticMutation = useCreate({
        onSuccess: () => {
            setModalVisible(false);
            form.resetFields();
        },
    });

    const updateCosmeticMutation = useUpdate({
        onSuccess: () => {
            setModalVisible(false);
            form.resetFields();
        },
    });

    const deleteCosmeticMutation = useDelete();

    const cosmetics = data?.cosmetics || [];
    const total = data?.total || 0;

    const showModal = (cosmetic = null) => {
        setEditingCosmetic(cosmetic);
        form.resetFields();
        if (cosmetic) {
            form.setFieldsValue(cosmetic);
        }
        setModalVisible(true);
    };

    const handleSaveCosmetic = (values) => {
        if (editingCosmetic) {
            // Cập nhật sản phẩm
            updateCosmeticMutation.mutate({
                id: editingCosmetic._id,
                data: values,
            });
        } else {
            // Tạo sản phẩm mới
            createCosmeticMutation.mutate(values);
        }
    };

    const handleDeleteCosmetic = (id) => {
        deleteCosmeticMutation.mutate(id);
    };

    const columns = [
        {
            title: "STT",
            key: "index",
            width: 60,
            render: (_, __, index) => (page - 1) * limit + index + 1,
        },
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            width: 200,
        },
        {
            title: "Thương hiệu",
            dataIndex: "brand",
            key: "brand",
            width: 100,
        },
        {
            title: "Danh mục",
            dataIndex: "category",
            key: "category",
            width: 120,
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            width: 120,
            render: (price) => `${price.toLocaleString("vi-VN")} ₫`,
        },
        {
            title: "Giảm giá",
            dataIndex: "discount",
            key: "discount",
            width: 100,
            render: (discount) => (discount > 0 ? `${discount}%` : "-"),
        },
        {
            title: "Kho",
            dataIndex: "stock",
            key: "stock",
            width: 80,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: 110,
            render: (status) => {
                let color = "#52c41a";
                if (status === "Hết hàng") color = "#ff4d4f";
                if (status === "Sắp về") color = "#fa8c16";

                return (
                    <Tag color={color} style={{ margin: 0 }}>
                        {status}
                    </Tag>
                );
            },
        },
        {
            title: "Thao tác",
            key: "action",
            width: 150,
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => showModal(record)}
                        style={{ color: "var(--color-primary)" }}
                        loading={
                            updateCosmeticMutation.isLoading &&
                            updateCosmeticMutation.variables?.id === record._id
                        }
                    >
                        <EditOutlined /> Sửa
                    </Button>
                    <Popconfirm
                        title="Xóa sản phẩm?"
                        onConfirm={() => handleDeleteCosmetic(record._id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button
                            type="link"
                            danger
                            size="small"
                            style={{ color: "#ff4d4f" }}
                            loading={
                                deleteCosmeticMutation.isLoading &&
                                deleteCosmeticMutation.variables === record._id
                            }
                        >
                            <DeleteOutlined /> Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // Component thanh tìm kiếm và lọc
    const FilterBar = () => (
        <div
            style={{
                marginBottom: 16,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <div style={{ display: "flex", gap: 16 }}>
                {/* <Input
                    placeholder="Tìm kiếm sản phẩm..."
                    style={{ width: 250 }}
                    value={search}
                    onChange={(e) => {                        này khắc phục được lỗi của nó theo hướng sử dụng searchdebounce
                        setSearch(e.target.value);
                        setPage(1); 
                    }}
                    allowClear
                /> */}
                <Select
                    placeholder="Danh mục"
                    style={{ width: 150 }}
                    value={categoryFilter}
                    onChange={(value) => {
                        setCategoryFilter(value);
                        setPage(1);
                    }}
                    allowClear
                >
                    <Option value="Son môi">Son môi</Option>
                    <Option value="Kem chống nắng">Kem chống nắng</Option>
                    <Option value="Sữa rửa mặt">Sữa rửa mặt</Option>
                    <Option value="Toner">Toner</Option>
                </Select>
                <Select
                    placeholder="Trạng thái"
                    style={{ width: 150 }}
                    value={statusFilter}
                    onChange={(value) => {
                        setStatusFilter(value);
                        setPage(1);
                    }}
                    allowClear
                >
                    <Option value="Còn hàng">Còn hàng</Option>
                    <Option value="Hết hàng">Hết hàng</Option>
                    <Option value="Sắp về">Sắp về</Option>
                </Select>
            </div>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => showModal()}
                style={{
                    background: "var(--color-primary)",
                    borderColor: "var(--color-primary)",
                }}
                loading={createCosmeticMutation.isLoading}
            >
                Thêm sản phẩm
            </Button>
        </div>
    );

    return (
        <div className="cosmetic-management">
            <FilterBar />

            {isError && (
                <p style={{ textAlign: "center", color: "red" }}>
                    Không thể tải danh sách sản phẩm
                </p>
            )}

            <SpinnerComponent isLoading={isLoading}>
                <Table
                    dataSource={cosmetics}
                    columns={columns}
                    rowKey="_id"
                    pagination={{
                        pageSize: limit,
                        current: page,
                        total: total,
                        onChange: (p) => setPage(p),
                        showSizeChanger: false,
                    }}
                    loading={isFetching}
                />
            </SpinnerComponent>

            <Modal
                title={editingCosmetic ? "Sửa sản phẩm" : "Thêm sản phẩm"}
                open={modalVisible}
                onCancel={() => {
                    setModalVisible(false);
                    form.resetFields();
                }}
                onOk={() => form.submit()}
                okText={editingCosmetic ? "Cập nhật" : "Thêm mới"}
                cancelText="Hủy"
                okButtonProps={{
                    style: {
                        background: "var(--color-primary)",
                        borderColor: "var(--color-primary)",
                    },
                    loading:
                        createCosmeticMutation.isLoading || updateCosmeticMutation.isLoading,
                }}
                confirmLoading={
                    createCosmeticMutation.isLoading || updateCosmeticMutation.isLoading
                }
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSaveCosmetic}
                    disabled={createCosmeticMutation.isLoading || updateCosmeticMutation.isLoading}
                >
                    <Form.Item
                        name="name"
                        label="Tên sản phẩm"
                        rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
                    >
                        <Input placeholder="Nhập tên sản phẩm" />
                    </Form.Item>

                    <Form.Item
                        name="images"
                        label="Hình ảnh sản phẩm (mỗi URL một dòng)"
                        rules={[
                            { required: true, message: "Vui lòng nhập ít nhất một hình ảnh" },
                            {
                                validator: (_, value) => {
                                    if (value) {
                                        const urls = value.split('\n').filter(url => url.trim());
                                        const validUrls = urls.filter(url => {
                                            try {
                                                new URL(url.trim());
                                                return true;
                                            } catch {
                                                return false;
                                            }
                                        });

                                        if (validUrls.length === 0) {
                                            return Promise.reject(new Error("Không có URL hợp lệ"));
                                        }
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Nhập URL hình ảnh, mỗi URL trên một dòng:
                                https://example.com/image1.jpg
                                https://example.com/image2.jpg
                                https://example.com/image3.jpg"
                            autoSize={{ minRows: 3, maxRows: 6 }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="brand"
                        label="Thương hiệu"
                        rules={[{ required: true, message: "Vui lòng nhập thương hiệu" }]}
                    >
                        <Input placeholder="Nhập thương hiệu" />
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="Danh mục"
                        rules={[{ required: true, message: "Vui lòng nhập danh mục" }]}
                    >
                        <Input placeholder="Nhập danh mục" />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="Giá"
                        rules={[{ required: true, message: "Vui lòng nhập giá" }]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={0}
                            formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            }
                            placeholder="Nhập giá"
                        />
                    </Form.Item>

                    <Form.Item name="discount" label="Giảm giá (%)">
                        <InputNumber
                            style={{ width: "100%" }}
                            min={0}
                            max={100}
                            placeholder="0"
                        />
                    </Form.Item>

                    <Form.Item
                        name="stock"
                        label="Số lượng trong kho"
                        rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={0}
                            placeholder="Nhập số lượng"
                        />
                    </Form.Item>

                    <Form.Item name="status" label="Trạng thái">
                        <Select placeholder="Chọn trạng thái">
                            <Option value="Còn hàng">Còn hàng</Option>
                            <Option value="Hết hàng">Hết hàng</Option>
                            <Option value="Sắp về">Sắp về</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CosmeticManagement;