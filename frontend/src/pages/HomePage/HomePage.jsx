import React from "react";
import { useQuery } from "@tanstack/react-query";

import ProductCardComponent from "../../components/ProductCardComponent/ProductCardComponent";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import ProductSliderComponent from "../../components/ProductSliderComponent/ProductSliderComponent";
import SpinnerComponent from "../../components/SpinnerComponent/SpinnerComponent";

import CosmeticsService from "../../services/cosmetics.service";
import "./HomePage.css";

const HomePage = () => {
  // Slider images
  const sliderImages = [
    "/assets/images/slide1.png",
    "/assets/images/slide2.png",
    "/assets/images/slide3.png",
  ];

  const {
    data: saleData,
    isLoading: saleLoading,
    isError: saleError,
  } = useQuery({
    queryKey: ["sale-products"],
    queryFn: () =>
      CosmeticsService.getCosmetics({
        sortBy: "discount",
        order: "desc",
        limit: 8,
      }),
  });

  const {
    data: bestSellerData,
    isLoading: bestSellerLoading,
    isError: bestSellerError,
  } = useQuery({
    queryKey: ["best-seller-products"],
    queryFn: () =>
      CosmeticsService.getCosmetics({
        sortBy: "sold",
        order: "desc",
        limit: 4,
      }),
  });

  // Loading
  if (saleLoading || bestSellerLoading) {
    return <SpinnerComponent />;
  }

  // Error
  if (saleError || bestSellerError) {
    return <div>Không thể tải dữ liệu trang chủ</div>;
  }

  const saleProducts = saleData?.cosmetics || [];
  const bestSellerProducts = bestSellerData?.cosmetics || [];

  return (
    <div className="home-page">
      {/* Main Slider */}
      <section className="main-slider-section">
        <SliderComponent slides={sliderImages} />
      </section>

      {/* Sale Products Slider */}
      <section className="sale-products-section">
        <div className="section-header">
          <h2 className="section-title">Sản phẩm giảm giá sốc</h2>
          {/* <div className="section-subtitle">Giảm đến 40%</div> */}
        </div>

        <ProductSliderComponent products={saleProducts} />
      </section>

      {/* Best Seller Products */}
      <section className="featured-products-section">
        <div className="section-header">
          <h2 className="section-title">Sản phẩm bán chạy</h2>
        </div>

        <div className="products-grid">
          {bestSellerProducts.map((item) => (
            <div className="product-card-wrapper" key={item._id}>
              <ProductCardComponent product={item} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
