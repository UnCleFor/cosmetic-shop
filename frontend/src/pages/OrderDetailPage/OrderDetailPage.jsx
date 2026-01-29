import React from "react";
import { Card, Tag, Button, Space, Divider, Row, Col, List, Avatar } from "antd";
import {
    ArrowLeftOutlined,
    ShoppingOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    CreditCardOutlined,
    HomeOutlined,
    PhoneOutlined,
    PrinterOutlined,
    UserOutlined,
    TruckOutlined,
    CloseOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useOrderDetail from "../../hooks/order/useOrderDetail";
import "./OrderDetailPage.css";
import SpinnerComponent from "../../components/SpinnerComponent/SpinnerComponent";

const OrderDetailPage = () => {
    const { data, isLoading, isError } = useOrderDetail();
    const navigate = useNavigate();

    // Chọn màu cho trạng thái đơn hàng
    const statusConfig = {
        confirming: {
            color: "orange",
            icon: <ClockCircleOutlined />,
            text: "Chờ xác nhận"
        },
        processing: {
            color: "blue",
            icon: <ClockCircleOutlined />,
            text: "Đang xử lý"
        },
        shipping: {
            color: "geekblue",
            icon: <TruckOutlined />,
            text: "Đang giao hàng"
        },
        completed: {
            color: "green",
            icon: <CheckCircleOutlined />,
            text: "Hoàn thành"
        },
        cancelled: {
            color: "red",
            icon: <CloseOutlined />,
            text: "Đã hủy"
        }
    };

    const formatPrice = (price) => {
        if (!price) return '0 ₫'
        return price.toLocaleString('vi-VN') + ' ₫';
    };

    const handleBack = () => {
        navigate('/orders');
    };

    if (isError) return <div>Đã xảy ra lỗi khi tải đơn hàng</div>
    if (!data?.data) return null;

    const order = data.data
    console.log(order.items[0].name)

    return (
        <SpinnerComponent isLoading={isLoading}>
            <div className="order-detail-minimal">
                {/* Header */}
                <div className="order-header-minimal">
                    <Button
                        type="link"
                        icon={<ArrowLeftOutlined />}
                        onClick={handleBack}
                        className="back-btn-minimal"
                    >
                    </Button>
                    <h1 className="order-title">
                        <span>Đơn hàng #</span>
                        <span className="order-id">{order._id}</span>
                    </h1>
                </div>

                {/* Status and date */}
                <div className="order-status-minimal">
                    <Tag
                        color={statusConfig[order.status].color}
                        className="status-tag-minimal"
                    >
                        {statusConfig[order.status].text}
                    </Tag>
                    <span className="order-date-minimal">Đặt ngày: {new Date(order.createdAt).toLocaleString("vi-VN")}</span>
                </div>

                <div className="order-content-minimal">
                    {/* Products */}
                    <Card title="Sản phẩm đã mua" className="products-card-minimal">
                        <List
                            dataSource={order.items}
                            renderItem={(item) => {
                                const priceDiscount = (item.price * item.discount / 100) * item.quantity;
                                const itemTotal = item.price * item.quantity - priceDiscount;

                                return (
                                    <List.Item className="product-item-minimal">
                                        <Avatar
                                            src={item.image}
                                            size={64}
                                            shape="square"
                                            className="product-image"
                                        />
                                        <div className="product-details">
                                            <div className="product-name">{item.name}</div>
                                            <div className="product-meta">
                                                <span className="product-quantity">Số lượng: {item.quantity}</span>
                                                <span className="product-price">{formatPrice(itemTotal)}</span>
                                            </div>
                                        </div>
                                    </List.Item>
                                )
                            }}
                        />
                    </Card>

                    <Row gutter={[16, 16]} className="order-info-row">
                        {/* Shipping info */}
                        <Col xs={24} md={12}>
                            <Card title="Thông tin giao hàng" className="info-card">
                                <div className="info-item">
                                    <UserOutlined className="info-icon" />
                                    <div className="info-content">
                                        <div className="info-label">Người nhận</div>
                                        <div className="info-value">{order.shippingAddress.name}</div>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <PhoneOutlined className="info-icon" />
                                    <div className="info-content">
                                        <div className="info-label">Số điện thoại</div>
                                        <div className="info-value">{order.shippingAddress.phone}</div>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <HomeOutlined className="info-icon" />
                                    <div className="info-content">
                                        <div className="info-label">Địa chỉ</div>
                                        <div className="info-value">{order.shippingAddress.address}</div>
                                    </div>
                                </div>
                            </Card>
                        </Col>

                        {/* Payment summary */}
                        <Col xs={24} md={12}>
                            <Card title="Thanh toán" className="info-card">
                                <div className="payment-summary-minimal">
                                    <div className="summary-item">
                                        <span className="summary-label">Tạm tính:</span>
                                        <span className="summary-value">{formatPrice(order.totalPrice)}</span>
                                    </div>
                                    <Divider className="summary-divider" />
                                    <div className="summary-item total">
                                        <span className="summary-label">Tổng cộng:</span>
                                        <span className="summary-value total-price">{formatPrice(order.totalPrice)}</span>
                                    </div>
                                    <div className="payment-method-minimal">
                                        <CreditCardOutlined className="payment-icon" />
                                        <span>{order.paymentMethod}</span>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </SpinnerComponent>
    );
};

export default OrderDetailPage;