import React from "react";
import ProductCardComponent from "../../components/ProductCardComponent/ProductCardComponent";
import PaginationComponent from "../../components/PaginationComponent/index";
import { PageContainer, 
        Title, 
        ProductGrid, 
        FilterSortBar, 
        FilterGroup, 
        SortSelect } from "./ProductPage.styles";

const ProductPage = () => {
  const products = [
    {
      id: 1,
      name: "Sữa rửa mặt Green Tea",
      price: 199000,
      image: "./assets/images/sample.png",
    },
    {
      id: 2,
      name: "Kem dưỡng ẩm Hoa Hồng",
      price: 299000,
      image: "./assets/images/sample.png",
    },
    {
      id: 3,
      name: "Tinh chất Vitamin C",
      price: 359000,
      image: "./assets/images/sample.png",
    },
    {
      id: 4,
      name: "Kem chống nắng SPF50+",
      price: 249000,
      image: "./assets/images/sample.png",
    },
  ];

  return (
    <PageContainer>
      <Title>Danh mục sản phẩm</Title>

      {/* Filter & Sort Bar */}
      <FilterSortBar>
        <FilterGroup>
          <label>
            <input type="checkbox" /> Dưới 200k
          </label>
          <label>
            <input type="checkbox" /> 200k - 400k
          </label>
          <label>
            <input type="checkbox" /> Trên 400k
          </label>
        </FilterGroup>

        <SortSelect>
          <label>Sắp xếp:</label>
          <select>
            <option value="default">Mặc định</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="name-asc">Tên A-Z</option>
          </select>
        </SortSelect>
      </FilterSortBar>

      {/* Product Grid */}
      <ProductGrid>
        {products.map((item) => (
          <ProductCardComponent key={item.id} product={item} />
        ))}
      </ProductGrid>

      <PaginationComponent total={48} pageSize={12} />
    </PageContainer>
  );
};

export default ProductPage;
