import React from "react";
import ProductCardComponent from "../../components/ProductCardComponent/ProductCardComponent";
import { PageContainer, Title, ProductGrid } from "./ProductPage.styles";

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
      <ProductGrid>
        {products.map((item) => (
          <ProductCardComponent key={item.id} product={item} />
        ))}
      </ProductGrid>
    </PageContainer>
  );
};

export default ProductPage;
