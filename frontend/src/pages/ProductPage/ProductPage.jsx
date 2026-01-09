import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCardComponent from "../../components/ProductCardComponent/ProductCardComponent";
import PaginationComponent from "../../components/PaginationComponent";
import SpinnerComponent from "../../components/SpinnerComponent/SpinnerComponent";
import CosmeticsService from "../../services/cosmetics.service";

import {
  PageContainer,
  Title,
  ProductGrid,
  FilterSortBar,
  SortSelect
} from "./ProductPage.styles";

const ProductPage = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("asc");
  const limit = 8;

  const queryParams = useMemo(() => ({
    page,
    limit,
    sortBy,
    order,
  }), [page, limit, sortBy, order]);

  const {
    data,
    isLoading,
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
    <PageContainer>
      <Title>Danh mục sản phẩm</Title>

      <FilterSortBar>
        <SortSelect>
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
        </SortSelect>
      </FilterSortBar>

      {isError && (
        <p style={{ textAlign: "center", color: "red" }}>
          Không thể tải sản phẩm
        </p>
      )}

      <SpinnerComponent isLoading={isFetching}>
          <ProductGrid style={{ opacity: isFetching ? 0.6 : 1 }}>
            {products.map((item) => (
              <ProductCardComponent
                key={item._id}
                product={item}
              />
            ))}
          </ProductGrid>

          {products.length === 0 && (
            <p style={{ textAlign: "center" }}>
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
    </PageContainer>
  );
};

export default ProductPage;
