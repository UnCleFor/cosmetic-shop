import React from "react";
import { Pagination } from "antd";
import "./PaginationComponent.css";

const PaginationComponent = ({
  current = 3,
  total = 100,
  pageSize = 12,
  onChange,
}) => {
  return (
    <div className="pagination-wrapper">
      <Pagination
        total={total}
        pageSize={pageSize}
        current={current}
        onChange={onChange}
        showSizeChanger={false}
        showQuickJumper
      />
    </div>
  );
};

export default PaginationComponent;