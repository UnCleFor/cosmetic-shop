import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff7f0",
      }}
    >
      <Result
        status="404"
        title={
          <span style={{ color: "#E15404", fontWeight: 700 }}>
            404
          </span>
        }
        subTitle="Xin lỗi, trang bạn đang tìm kiếm không tồn tại."
        extra={
          <Button
            type="primary"
            style={{
              backgroundColor: "#E15404",
              borderColor: "#E15404",
            }}
            onClick={() => navigate("/")}
          >
            Quay về trang chủ
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
