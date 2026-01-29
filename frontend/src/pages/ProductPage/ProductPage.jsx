import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCardComponent from "../../components/ProductCardComponent/ProductCardComponent";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import SpinnerComponent from "../../components/SpinnerComponent/SpinnerComponent";
import CosmeticsService from "../../services/cosmetics.service";
import { useSearchParams } from "react-router-dom";
import "./ProductPage.css";

const ProductPage = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("asc");
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const limit = 8;

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      sortBy,
      order,
      ...(search && { search }),
    }),
    [page, limit, sortBy, order, search]
  );

  const {
    data,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["cosmetics", queryParams],
    queryFn: () => CosmeticsService.getCosmetics(queryParams),
    keepPreviousData: true,
  });

  const products = data?.cosmetics || [];
  const total = data?.total || 0;

  return (
    <div className="product-page-container">
      <h1 className="product-page-title">
        {search
          ? `Kết quả tìm kiếm cho "${search}"`
          : "Danh mục sản phẩm"}
      </h1>

      <div className="product-filter-sort-bar">
        <div className="product-sort-select">
          <label>Sắp xếp:</label>
          <select
            onChange={(e) => {
              setPage(1);
              const value = e.target.value;

              if (value === "default") {
                setSortBy("createdAt");
                setOrder("asc");
                return;
              }

              const [field, direction] = value.split("-");
              setSortBy(field);
              setOrder(direction);
            }}
          >
            <option value="default">Mặc định</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="name-asc">Tên A-Z</option>
            <option value="name-desc">Tên Z-A</option>
          </select>
        </div>
      </div>

      {isError && (
        <p className="product-error-message">
          Không thể tải sản phẩm
        </p>
      )}

      <SpinnerComponent isLoading={isFetching}>
        <div
          className="product-grid"
          style={{ opacity: isFetching ? 0.6 : 1 }}
        >
          {products.map((item) => (
            <ProductCardComponent
              key={item._id}
              product={item}
            />
          ))}
        </div>

        {products.length === 0 && (
          <p className="product-empty-message">
            Không có sản phẩm
          </p>
        )}
      </SpinnerComponent>

      <PaginationComponent
        total={total}
        pageSize={limit}
        current={page}
        onChange={(p) => setPage(p)}
      />
    </div>
  );
};

export default ProductPage;