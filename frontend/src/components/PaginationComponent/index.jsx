import React from "react";
import { Pagination } from "antd";
import { PaginationWrapper } from "./styles";

const PaginationComponent = ({ current = 3, total = 100, pageSize = 12, onChange }) => {
  return (
    <PaginationWrapper>
      <Pagination
        total={total}
        pageSize={pageSize}
        current={current}
        onChange={onChange}
        showSizeChanger={false} // Ẩn dropdown chọn số sản phẩm/trang
        showQuickJumper
      />
    </PaginationWrapper>
  );
};

export default PaginationComponent;