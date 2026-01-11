import React, { useState } from "react";
import { Tabs, Card, Tag, Button, Space, Empty, Modal, message } from "antd";
import {
  ShoppingOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  TruckOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
  CreditCardOutlined,
  HomeOutlined,
  CloseOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import "./OrderPage.css";
import useMyOrders from "../../hooks/order/useMyOrder";
import useSoftDelete from "../../hooks/order/useSoftDelete";
import useCancel from "../../hooks/order/userCancel";

const { TabPane } = Tabs;

const OrderPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { data: orders = [], isLoading } = useMyOrders();
  const softDelete = useSoftDelete();
  const cancelOrder = useCancel();
  const navigate = useNavigate();
  // State để quản lý modal
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Ẩn các đơn hàng đã xóa
  const visibleOrders = orders.filter(o => o.status !== "deleted");

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


  const getOrdersByStatus = (status) => {
    if (status === "all") return visibleOrders;
    return visibleOrders.filter(order => order.status === status);
  };

  const formatPrice = (price) => {
    if (!price && price !== 0) return '0 ₫';
    return price.toLocaleString('vi-VN') + ' ₫';
  };

  const handleViewDetail = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const handleCancelOrder = (orderId) => {
    console.log('Opening cancel modal for order:', orderId);
    setSelectedOrderId(orderId);
    setCancelModalVisible(true);
  };

  const handleDeleteOrder = (orderId) => {
    console.log('Opening delete modal for order:', orderId);
    setSelectedOrderId(orderId);
    setDeleteModalVisible(true);
  };

  const confirmCancel = () => {
    if (selectedOrderId) {
      console.log('Confirmed cancel for:', selectedOrderId);
      cancelOrder.mutate(selectedOrderId, {
        onSuccess: () => {
          message.success('Đã hủy đơn hàng thành công');
          setCancelModalVisible(false);
        },
        onError: (error) => {
          message.error('Hủy đơn hàng thất bại: ' + error.message);
        }
      });
    }
  };

  const confirmDelete = () => {
    if (selectedOrderId) {
      console.log('Confirmed delete for:', selectedOrderId);
      softDelete.mutate(selectedOrderId, {
        onSuccess: () => {
          message.success('Đã xóa đơn hàng thành công');
          setDeleteModalVisible(false);
        },
        onError: (error) => {
          message.error('Xóa đơn hàng thất bại: ' + error.message);
        }
      });
    }
  };

  return (
    <div className="my-orders-container">
      <div className="orders-header-simple">
        <h1 className="page-title-simple">
          <ShoppingOutlined /> Đơn hàng của tôi
        </h1>
        <p className="page-subtitle-simple">Quản lý và theo dõi đơn hàng của bạn</p>
      </div>

      <Card className="orders-tabs-card-simple">
        <Tabs activeKey={activeTab} onChange={setActiveTab} className="my-orders-tabs-simple">
          <TabPane tab={`Tất cả (${visibleOrders.length})`} key="all" />
          <TabPane
            tab={`Chờ xác nhận (${visibleOrders.filter(o => o.status === "confirming").length})`}
            key="confirming"
          />
          <TabPane
            tab={`Đang xử lý (${visibleOrders.filter(o => o.status === "processing").length})`}
            key="processing"
          />
          <TabPane
            tab={`Đang giao (${visibleOrders.filter(o => o.status === "shipping").length})`}
            key="shipping"
          />
          <TabPane
            tab={`Hoàn thành (${visibleOrders.filter(o => o.status === "completed").length})`}
            key="completed"
          />
          <TabPane
            tab={`Đã hủy (${visibleOrders.filter(o => o.status === "cancelled").length})`}
            key="cancelled"
          />
        </Tabs>

        <div className="orders-list-simple">
          {getOrdersByStatus(activeTab).length === 0 ? (
            <Empty
              description="Chưa có đơn hàng nào"
              className="empty-orders-simple"
            >
            </Empty>
          ) : (
            getOrdersByStatus(activeTab).map((order) => (
              <Card key={order._id} className="order-card-simple">
                <div className="order-header-simple">
                  <div>
                    <div className="order-id-simple">
                      <strong>{order._id}</strong>
                    </div>
                    <div className="order-date-simple">
                      {new Date(order.createdAt).toLocaleString("vi-VN")}
                    </div>
                  </div>
                  <Tag
                    color={statusConfig[order.status].color}
                    className="status-tag-simple"
                  >
                    {statusConfig[order.status].icon}
                    {statusConfig[order.status].text}
                  </Tag>
                </div>

                <div className="order-info-simple">
                  <div className="info-row">
                    <span className="info-label">Tổng tiền:</span>
                    <span className="info-value total-price">{formatPrice(order.totalPrice)}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Thanh toán:</span>
                    <span className="info-value cod">
                      <span className="info-value cod">
                        <CreditCardOutlined />
                        {order.paymentMethod === "cod"
                          ? " Thanh toán khi nhận hàng"
                          : " Chuyển khoản"}
                      </span>
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Giao đến:</span>
                    <span className="info-value">
                      <HomeOutlined /> {order.shippingAddress.address}
                    </span>
                  </div>
                </div>

                <div className="order-actions-simple">
                  <Space className="space">
                    <Button
                      type="default"
                      icon={<EyeOutlined />}
                      onClick={() => handleViewDetail(order._id)}
                      className="view-btn"
                    >
                      Xem chi tiết
                    </Button>

                    {order.status === "confirming" && (
                      <Button
                        danger
                        icon={<CloseOutlined />}
                        onClick={() => handleCancelOrder(order._id)}
                      >
                        Hủy đơn
                      </Button>
                    )}

                    {["completed", "cancelled"].includes(order.status) && (
                      <Button
                        danger
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteOrder(order._id)}
                        className="delete-btn"
                      >
                        Xóa đơn
                      </Button>
                    )}
                  </Space>
                </div>
              </Card>
            ))
          )}
        </div>
      </Card>
      {/* Các modal */}
      <Modal
        title="Hủy đơn hàng"
        open={cancelModalVisible}
        onOk={confirmCancel}
        onCancel={() => setCancelModalVisible(false)}
        okText="Xác nhận"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        <p>Bạn có chắc muốn hủy đơn hàng này?</p>
        <p style={{ color: '#ff4d4f', fontStyle: 'italic' }}>
          Hành động này không thể hoàn tác.
        </p>
      </Modal>

      <Modal
        title="Xóa đơn hàng"
        open={deleteModalVisible}
        onOk={confirmDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        <p>Đơn hàng sẽ không còn hiển thị với bạn.</p>
        <p style={{ color: '#ff4d4f', fontStyle: 'italic' }}>
          Bạn vẫn có thể xem lại đơn hàng đã xóa trong mục "Đã xóa".
        </p>
      </Modal>
    </div>
  );
};

export default OrderPage;